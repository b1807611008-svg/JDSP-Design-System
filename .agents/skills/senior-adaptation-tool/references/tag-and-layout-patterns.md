# 有色标签识别 + 布局保持模式（通用代码参考）

本文为 SKILL.md 中 "Step 4.0 通用处理基线" 的实现参考。两份脚本（大字版 1.15x、长辈版 1.3x）共享同一套基线，仅 `SCALE` 不同。可整段移植到 `use_design_script` 中执行。

> ⚠️ 移植到 `use_design_script` 执行前，先按 SKILL.md §4 前置说明加载 `zero-design` 的 `use-design-script` 参考资源（`relay-plugin-api-index.md` / `relay-plugin-api.d.ts` / `gotchas.md`），核对 API 后再写脚本，不要臆测。

> **核心原则**
> 1. 「有色标签」整体 `rescale`，**禁止**对其内部 TEXT 再单独放大。
> 2. 文字 `lineHeight = Math.round(字号 × 1.2)`（固定像素值），`paragraphSpacing = 0`、`paragraphIndent = 0`；`textAutoResize` 按 V2.1 智能选择（HEIGHT 保留 / NONE 改 HEIGHT / WIDTH_AND_HEIGHT 保留，严禁把 HEIGHT 改为 WIDTH_AND_HEIGHT）。
> 3. 宽度严格保持，允许文字横向溢出；高度按 maxBottom 主动拉长画板。
> 4. 不修改父级 padding / itemSpacing。
> 5. **识别仅依据视觉特征与相对结构，禁止使用节点 name / 文本内容 / 固定像素阈值。**
> 6. **detach 在预处理画板统一执行一次**（V2.2）：自底向上 detachInstance，循环到 root 内不再存在 INSTANCE 为止；本文 `adaptFrame` 作用于已 clone 的目标画板，默认 `enableDetach = false`，不再重复 detach。
> 7. **如运行环境支持图像识别**，处理完成后用截图比对原画板与适配画板做最终校验。

---

## 1. 配置（全部为相对系数，不再有绝对像素阈值）

```js
// 标签识别相对阈值（按父卡片/画板归一化，不与具体像素绑定）
const TAG_AREA_RATIO_MAX   = 0.5;  // 容器面积占父级面积的最大比例
const TAG_SHORT_SIDE_RATIO = 0.6;  // 容器短边占父级短边的最大比例
const TAG_PADDING_RATIO    = 0.5;  // 容器到内部 TEXT 的四向 padding 占容器对应短边的最大比例
const TAG_TEXT_AREA_RATIO  = 0.35; // 容器内 TEXT 总占地面积占容器面积的最小比例
const TAG_TEXT_LINE_RATIO  = 2.0;  // text.height ≤ fontSize × 该比例 视作单行/极少行
const TAG_MAX_TEXT_NODES   = 2;    // 容器内 TEXT 段数上限

// 文字处理
const MIN_FONT = 12;               // 兜底最小字号（实测设计稿规范）
const SAFE_PAD = 16;               // 画板底部安全边
```

## 2. Paint 可见性 / 视觉边界判定

```js
function hasVisiblePaint(paints) {
  if (!paints || paints === relay.mixed) return false;
  return paints.some(p =>
    p.visible !== false &&
    (p.opacity == null || p.opacity > 0.01) &&
    !(p.type === 'SOLID' && p.color && (p.color.a === 0))
  );
}

// 视觉边界：fill / stroke / cornerRadius 任一存在视为有边界
function hasVisualBoundary(node) {
  if (hasVisiblePaint(node.fills)) return true;
  if (hasVisiblePaint(node.strokes)) return true;
  // cornerRadius 可能是数字、可能是 mixed（四角不同）
  const cr = node.cornerRadius;
  if (typeof cr === 'number' && cr > 0) return true;
  if (cr === relay.mixed) return true; // 四角圆角不同也算
  return false;
}
```

## 3. 几何工具：包围盒、相对面积、padding 估算

```js
// 取节点在文档坐标系下的包围盒
function boxOf(n) {
  return {
    x: n.absoluteBoundingBox ? n.absoluteBoundingBox.x : n.x,
    y: n.absoluteBoundingBox ? n.absoluteBoundingBox.y : n.y,
    w: n.width,
    h: n.height,
  };
}

function area(b) { return Math.max(0, b.w) * Math.max(0, b.h); }

// 容器内所有非空 TEXT 的合并包围盒（相对该容器自身的相对坐标即可）
function textBoxesIn(node) {
  const list = node.findAll(n => n.type === 'TEXT' && n.characters && n.characters.trim().length > 0);
  return list.map(t => boxOf(t));
}

// 估算容器到内部内容的四向 padding
function estimatePadding(node, contentBoxes) {
  if (!contentBoxes.length) return null;
  const cb = boxOf(node);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const b of contentBoxes) {
    if (b.x < minX) minX = b.x;
    if (b.y < minY) minY = b.y;
    if (b.x + b.w > maxX) maxX = b.x + b.w;
    if (b.y + b.h > maxY) maxY = b.y + b.h;
  }
  return {
    left:   minX - cb.x,
    top:    minY - cb.y,
    right:  (cb.x + cb.w) - maxX,
    bottom: (cb.y + cb.h) - maxY,
  };
}
```

## 4. 视觉特征驱动的标签识别（关键）

```js
function isColoredTag(node, parentForRatio) {
  // 仅类容器节点参与
  const containerTypes = ['FRAME', 'GROUP', 'INSTANCE', 'COMPONENT'];
  if (!containerTypes.includes(node.type)) return false;

  // —— 排除：根 Frame / Page / Section ——
  if (!node.parent || node.parent.type === 'PAGE' || node.type === 'SECTION') return false;

  // —— 特征 A：可视边界 ——
  if (!hasVisualBoundary(node)) return false;

  // —— 排除：含图片填充（不是标签，是带图卡片）——
  const fills = node.fills;
  if (fills && fills !== relay.mixed && fills.some(p => p.type === 'IMAGE' && p.visible !== false)) {
    return false;
  }

  // —— 内部 TEXT 集合 ——
  const texts = node.findAll(n => n.type === 'TEXT' && n.characters && n.characters.trim().length > 0);
  if (texts.length === 0) return false;
  if (texts.length > TAG_MAX_TEXT_NODES) return false;   // TEXT 段过多 → 不是标签

  // —— 特征 D：内容稳定（单行/极少行）——
  for (const t of texts) {
    const fs = (typeof t.fontSize === 'number') ? t.fontSize : 16;
    if (t.height > fs * TAG_TEXT_LINE_RATIO) return false;
  }

  // —— 排除：里面还有"另一个有视觉边界的子容器"（标签套标签时取外层即可，这里防误把卡片当标签）——
  const innerBoundedContainers = node.findAll(c =>
    c !== node &&
    containerTypes.includes(c.type) &&
    hasVisualBoundary(c)
  );
  if (innerBoundedContainers.length > 0) return false;

  // —— 特征 C：相对父级而言是"小单元" ——
  const parent = parentForRatio || node.parent;
  if (parent && 'width' in parent && 'height' in parent) {
    const pArea = parent.width * parent.height;
    const nArea = node.width * node.height;
    if (pArea > 0 && nArea / pArea > TAG_AREA_RATIO_MAX) return false;

    const pShort = Math.min(parent.width, parent.height);
    const nShort = Math.min(node.width, node.height);
    if (pShort > 0 && nShort / pShort > TAG_SHORT_SIDE_RATIO) return false;
  }

  // —— 特征 B：紧贴文字 ——
  const tboxes = texts.map(t => boxOf(t));
  // B-1: TEXT 总占地面积占容器面积比例
  const containerArea = node.width * node.height;
  let textArea = 0;
  for (const tb of tboxes) textArea += area(tb);
  if (containerArea > 0 && textArea / containerArea < TAG_TEXT_AREA_RATIO) return false;

  // B-2: 容器到 TEXT 包围盒四向 padding 相对短边偏小
  const pad = estimatePadding(node, tboxes);
  if (pad) {
    const shortSide = Math.min(node.width, node.height);
    const limit = shortSide * TAG_PADDING_RATIO;
    if (pad.left > limit || pad.right > limit || pad.top > limit || pad.bottom > limit) return false;
  }

  return true;
}
```

> 说明：上述识别仅访问节点的 **几何尺寸、可视样式、子节点结构**，没有读取任何 `node.name` / `text.characters` 内容做判定，符合"对任意设计稿通用"的要求。

## 5. 文字处理：行高 = 字号 ×1.2、段距 = 0、字号取整（含上限）、textAutoResize 智能选择

```js
async function processText(text, scale) {
  const fonts = new Map();
  if (text.fontName !== relay.mixed) {
    fonts.set(`${text.fontName.family}|${text.fontName.style}`, text.fontName);
  } else {
    for (let i = 0; i < text.characters.length; i++) {
      const r = text.getRangeFontName(i, i + 1);
      if (r !== relay.mixed) fonts.set(`${r.family}|${r.style}`, r);
    }
  }
  await Promise.all([...fonts.values()].map(f => relay.loadFontAsync(f)));

  // textAutoResize 智能选择（V2.1）：HEIGHT 保留、WIDTH_AND_HEIGHT 保留、NONE 改 HEIGHT
  // 严禁把 HEIGHT 改为 WIDTH_AND_HEIGHT —— 会让同行多文本（标题 + 价格）互相覆盖
  try { if (text.textAutoResize === 'NONE') text.textAutoResize = 'HEIGHT'; } catch (_) {}
  try { text.paragraphSpacing = 0; } catch (_) {}
  try { text.paragraphIndent = 0; } catch (_) {}

  // 字号上限（V2.1 §2.5）：≥ FS_CAP 的常规 TEXT 保持原值不放大（大字 24 / 长辈 26）
  const FS_CAP = scale >= 1.3 ? 26 : 24;
  const capSize = (old) => (old >= FS_CAP ? old : Math.max(MIN_FONT, Math.round(old * scale)));
  const LH = (fs) => Math.round(fs * 1.2);   // 行高 = 字号 × 1.2（V2.2）

  const len = text.characters.length;
  if (len === 0) return;

  const uniform = text.getRangeFontSize(0, len);
  if (uniform !== relay.mixed) {
    const newSize = capSize(uniform);
    text.fontSize = newSize;
    // 行高 = 新字号 × 1.2（固定像素）
    try { text.lineHeight = { value: LH(newSize), unit: 'PIXELS' }; } catch (_) {}
  } else {
    // 混合字号：逐段处理 fontSize 与 lineHeight，每段独立判断字号上限
    let i = 0;
    while (i < len) {
      const size = text.getRangeFontSize(i, i + 1);
      let j = i + 1;
      while (j < len && text.getRangeFontSize(j, j + 1) === size) j++;
      if (size !== relay.mixed) {
        const newSize = capSize(size);
        text.setRangeFontSize(i, j, newSize);
        try { text.setRangeLineHeight(i, j, { value: LH(newSize), unit: 'PIXELS' }); } catch (_) {}
        try { text.setRangeParagraphSpacing(i, j, 0); } catch (_) {}
      }
      i = j;
    }
  }
}
```

> 旧版本曾使用 `{ unit: 'AUTO' }`，会因不同字体的隐式行高而出现"压行 / 行高过大"等不可预测情况；现统一改为"行高 = 字号 × 1.2"的固定像素值（V2.2），并显式归零段落间距，保证视觉紧凑且可预测。`textAutoResize` 不再无脑设 `WIDTH_AND_HEIGHT`，而是按 V2.1 智能选择尊重原稿换行意图。

## 6. 高度策略（宽固定 / 高 HUG / 根画板兜底）

```js
function applyHeightStrategy(root) {
  // 仅作用于 Auto Layout FRAME（严禁 GROUP / 非 Auto Layout FRAME）
  root.findAll(n => n.type === 'FRAME' && (n.layoutMode === 'VERTICAL' || n.layoutMode === 'HORIZONTAL')).forEach(n => {
    if (n.id === root.id) return; // 排除 root 自身
    try { n.layoutSizingHorizontal = 'FIXED'; } catch (_) {}
    try { n.layoutSizingVertical = 'HUG'; } catch (_) {}
  });

  let maxBottom = 0;
  for (const c of root.children) {
    const b = (c.y || 0) + (c.height || 0);
    if (b > maxBottom) maxBottom = b;
  }
  if (maxBottom > root.height) {
    const targetH = Math.ceil(maxBottom + SAFE_PAD);
    try { root.resize(root.width, targetH); }
    catch (_) { try { root.set({ height: targetH }); } catch (__) {} }
  }
}
```

## 7. 组件解绑（INSTANCE detach，V2.2 = 预处理画板执行一次 + 出错回滚）

> **V2.2 口径**：detach 在**预处理画板**统一执行一次（见 SKILL.md 2.6 / 4.1 Step 0），大字版 / 长辈版从预处理画板 clone 继承成果。调用 `detachAllInstances` 后**必须**紧跟 `isLayoutCorruptedAfterDetach` 检测；实战发现部分稿件 detach 会引发子节点 y 跳到几千像素位置（根 Frame 高度从 ~830 爆炸到 2000+），一旦检测到紊乱即丢弃 clone 重新 clone 并**跳过 detach**（降级模式，直接对 INSTANCE rescale）。

```js
// 自底向上 detach 所有 INSTANCE，循环到 root 内不再存在 INSTANCE 为止
async function detachAllInstances(root, maxLoop = 8) {
  let totalDetached = 0;
  let layerCount = 0;
  for (let i = 0; i < maxLoop; i++) {
    const instances = root.findAll(n => n.type === 'INSTANCE');
    if (instances.length === 0) break;
    const withDepth = instances.map(n => {
      let depth = 0, p = n.parent;
      while (p) { depth++; p = p.parent; }
      return { node: n, depth };
    });
    withDepth.sort((a, b) => b.depth - a.depth);
    for (const item of withDepth) {
      try {
        if (typeof item.node.detachInstance === 'function') {
          item.node.detachInstance();
          totalDetached++;
        }
      } catch (_) {}
    }
    layerCount = i + 1;
  }
  const remaining = root.findAll(n => n.type === 'INSTANCE').length;
  return { totalDetached, layerCount, remaining };
}

// 检测 detach 是否引起子节点位置紊乱
function isLayoutCorruptedAfterDetach(root) {
  const limit = root.height * 3;
  for (const c of root.children) {
    if (c.y < -1 || c.y > limit) return true;
  }
  return false;
}
```

## 8. 主入口（detach 由预处理画板负责；标签父容器默认带约束联动）

```js
async function adaptFrame(root, scale, opts = {}) {
  const {
    userSpecialNodeIds = [],
    enableDetach = false,        // 默认 false：detach 已在预处理画板完成，adaptFrame 不重复
    enableParentScale = true,    // 默认 true：标签父容器带约束联动（SKILL.md §4.0.1 强制）；回滚到「不联动」简化模式时传 false
  } = opts;

  // 阶段0: 可选 detach + 出错回滚
  let detachStat = null;
  if (enableDetach) {
    detachStat = await detachAllInstances(root);
    if (isLayoutCorruptedAfterDetach(root)) {
      // 此处通常应该由调用方丢弃 clone 重新走 enableDetach=false 流程
      return { error: 'detach_corrupted_layout', detachStat };
    }
  }

  const visited = new Set();

  // 阶段1: 用户指定的"特殊处理"组件
  for (const id of userSpecialNodeIds) {
    const n = await relay.getNodeByIdAsync(id);
    if (!n) continue;
    if ('rescale' in n) n.rescale(scale);
    visited.add(n.id);
    if (n.findAll) n.findAll(() => true).forEach(d => visited.add(d.id));
  }

  // 阶段2: 视觉特征驱动的"有色标签"自动识别
  const candidates = root.findAll(n =>
    n !== root && !visited.has(n.id) && isColoredTag(n, root)
  );
  const candidateIds = new Set(candidates.map(c => c.id));
  const tags = candidates.filter(c => {
    let p = c.parent;
    while (p && p !== root) {
      if (candidateIds.has(p.id)) return false; // 父级也是候选，则跳过内层
      p = p.parent;
    }
    return true;
  });

  // 用于父容器联动放大去重
  const parentScaled = new Set();

  // 父容器联动放大约束：父容器面积 ≤ 标签面积 × 该系数 才算"紧贴 wrapper"
  const PARENT_AREA_RATIO_MAX = 2.0;

  for (const tag of tags) {
    if ('rescale' in tag) tag.rescale(scale);
    visited.add(tag.id);
    tag.findAll(() => true).forEach(d => visited.add(d.id));

    // 联动放大标签的直接父容器：仅当父容器是"紧贴 wrapper"时才联动
    const parent = tag.parent;
    if (
      enableParentScale &&
      parent && parent !== root &&
      !visited.has(parent.id) &&
      !parentScaled.has(parent.id) &&
      'rescale' in parent
    ) {
      // 约束 A: 父容器面积 ≤ 标签面积 × PARENT_AREA_RATIO_MAX
      const tagArea = tag.width * tag.height;
      const parentArea = parent.width * parent.height;
      const areaCheckOK = tagArea > 0 && parentArea / tagArea <= PARENT_AREA_RATIO_MAX;

      // 约束 B: 父容器内除该 tag 外，不应再有其它有视觉边界的兄弟容器
      let hasSiblingWithBoundary = false;
      for (const sib of parent.children) {
        if (sib.id === tag.id) continue;
        if (['FRAME', 'GROUP', 'INSTANCE', 'COMPONENT'].includes(sib.type) && hasVisualBoundary(sib)) {
          hasSiblingWithBoundary = true; break;
        }
      }

      if (areaCheckOK && !hasSiblingWithBoundary) {
        try { parent.rescale(scale); } catch (_) {}
        parentScaled.add(parent.id);
        visited.add(parent.id);
        parent.findAll(() => true).forEach(d => visited.add(d.id));
      }
    }
  }

  // 阶段3: 常规 TEXT 放大（行高=字号×1.2，段距=0）
  const texts = root.findAll(n => n.type === 'TEXT');
  for (const t of texts) {
    if (visited.has(t.id)) continue;
    await processText(t, scale);
  }

  // 阶段4: 高度策略
  applyHeightStrategy(root);

  return { detachStat, tagsCount: tags.length, totalTexts: texts.length };
}
```

## 9. 截图校验（仅当运行环境支持图像识别时启用）

```js
// 用 zero-design MCP 提供的截图能力分别截取原画板与新画板
// 例如在外层调用方：
//   const shotSrc   = await zero.get_screenshot({ nodeId: srcId })
//   const shotBig   = await zero.get_screenshot({ nodeId: bigFontId })
//   const shotElder = await zero.get_screenshot({ nodeId: elderId })
// 然后由具备图像识别能力的模型对照检查。
```

校验维度：
- 标签是否完整无错位（背景色块 + 内部文字同步等比放大）；
- 是否纵向裁切（横向溢出允许）；
- 行间距是否紧凑、无明显空行；
- 整体结构是否与原稿一致、未发生模块顺序变化或重叠。

> 不支持图像识别的环境请直接跳过本节，不要伪造结论。校验未通过时输出"问题清单 + 节点 ID + 建议处理"，不应反复自动重做。

## 10. 画板尺寸回归 375×812（仅在截图校验通过后执行）

```js
// 把新画板的可见尺寸恢复为标准 375×812（裁切显示，不改动任何内容）
function clipToStandardSize(root, standardW = 375, standardH = 812) {
  try { root.clipsContent = true; } catch (_) {}
  try { root.resize(standardW, standardH); }
  catch (_) {
    try { root.set({ clipsContent: true, width: standardW, height: standardH }); } catch (__) {}
  }
}

// 在外层主流程的最后调用：
//   const verifyPassed = await screenshotVerify(srcId, bigId, elderId);
//   if (verifyPassed) {
//     clipToStandardSize(bigFrame);
//     clipToStandardSize(elderFrame);
//   }
```

**严格规则**：
1. 不修改任何子节点的 x / y / width / height / rescale；
2. 只对根 Frame 自身设 `clipsContent = true` 并 `resize(375, 812)`；
3. 锚点保持左上角（root.x、root.y 不变）；
4. 仅在 Step 6 截图校验通过后执行；未通过或环境不支持图像识别时跳过，保留延展后的画板。

---

## 11. 边界情况

| 情况 | 处理 |
|---|---|
| 标签嵌套标签 | 按"父级也是候选则跳过"取最外层；内层通过 visited 自动跳过 |
| 标签内带装饰 ICON / 小矩形 | 仍命中（条件计 TEXT 段数与文字面积比，不计 ICON）；rescale 一起放大 |
| 大卡片（带图 + 多段文字）| 命中"含图片填充"或"内部还有有视觉边界子容器"或"TEXT 段数过多"被排除，不会被当成标签 |
| 透明容器 | 没有 fill/stroke/cornerRadius 直接排除 |
| 横向 Tab 单项 | 通常无视觉边界（仅文本），不命中标签；若该项是用户指定的"特殊处理"组件，由阶段1处理 |
| 文本 fontName mixed | 字体逐段预加载、字号逐段处理 |
| 字号 < 12px | `Math.max(12, ...)` 兜底（`MIN_FONT = 12`） |
| 设计师认为漏识别/误识别 | 在 Zero 中手动调整；脚本不得为单个稿件硬编码例外 |

## 12. 调用示例

```js
// 大字版
const root = bigFontClone;
const stats = await adaptFrame(root, 1.15);

// 长辈版
const root = elderClone;
const stats = await adaptFrame(root, 1.3, userSpecialNodeIds /* 用户在 3.3 中确认的节点 ID 列表，可空 */);
```