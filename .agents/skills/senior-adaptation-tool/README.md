# senior-adaptation-tool · Zero 设计稿适老化适配技能

把 Relay/Zero 当前文件里的设计稿一键适配成**大字版（1.15x）**或**长辈版（1.3x）**，写回原画板右侧。零页面绑定，规则对所有 Zero 设计稿通用。

> Fork 自 `shizi/joycode-senior-adaptation-skill` v2.2，并入本仓库后做了**一致性修复**与**输入源去 Deco 化**改造。来源、署名与逐条改动见 [`UPSTREAM.md`](./UPSTREAM.md)。

## 工作链路

```
用户指定原画板节点
   → zero-design MCP 直读结构 / 字号 / 样式 / 布局
   → 按规则生成大字版 / 长辈版
   → zero-design MCP 写回原画板右侧
```

- ✅ **三画板架构**：原画板 → 预处理画板（保留作调试参考）→ 大字版 + 长辈版
- ✅ 预处理画板：INSTANCE 自底向上 detach（含出错回滚）+ 行高强制 ×1.2 覆盖
- ✅ 用户指定不放大节点（长辈版）：banner 图片 / 排名徽章 / 店铺 LOGO 等整体保持原尺寸
- ✅ 字号四舍五入取整、最小 12px；字号上限阈值（≥24pt 大字 / ≥26pt 长辈 保持原值）
- ✅ textAutoResize 智能选择（HEIGHT 保留、NONE 改 HEIGHT）；行高 = 字号 ×1.2
- ✅ 自动 HUG 高度延展、画板兜底 resize
- ✅ 有色标签 / 图文徽章视觉特征识别（不依赖节点名 / 文本内容硬编码）
- ✅ 特殊字号保护（LV.L/M/S、¥ + 价格视觉协调）、ICON 关联性识别、弹窗浮层处理

## 触发

`/senior-adaptation-tool`，或对话里说 **"适老化" / "大字版" / "长辈版" / "老年模式"**，并指定要适配的原画板：

```
帮这个画板做大字版和长辈版：节点 ID 1234:5678（或画板名「首页」）
```

## 前置依赖

- **zero-design MCP 已连接** —— Relay/Zero 设计画布，读取 + 写回的唯一依赖
- Relay/Zero 中已打开包含目标原画板的文件

> **与上游 v2.2 的关键差异**：上游强制经 Deco `getCode` 拉源码作为适配依据，需额外连接 Deco MCP。本仓库版本改为直接用 `zero-design` MCP（`get_design_metadata` / `get_design_context` / `get_variables`）读原画板真实节点，**不依赖 Deco**，与本仓库其它 skill 同构。改造理由与影响见 `UPSTREAM.md`。

## 字号对照表（实测设计稿权威）

| 原始 | 大字 ×1.15 | 长辈 ×1.3 |
|------|-----------|----------|
| 20   | 23        | 26       |
| 18   | 21        | 23       |
| 16   | 18        | 21       |
| 15   | 17        | 20       |
| 14   | 16        | 18       |
| 13   | 15        | 17       |
| 12   | 14        | 16       |
| 10   | 12        | 13       |

计算公式：`Math.max(12, Math.round(原字号 × scale))`，最小 12px；原字号 ≥ 上限（大字 24 / 长辈 26）保持原值。行高统一 `Math.round(新字号 × 1.2)`。

## 文件结构

```
senior-adaptation-tool/
├── SKILL.md                          # 主技能文档（工作链路 + 完整规则）
├── UPSTREAM.md                       # 上游来源、署名、逐条改动沿革
└── references/
    ├── validation-guide.md           # 验证清单 + 常见问题
    └── tag-and-layout-patterns.md    # 有色标签识别 + 文字 + 高度策略 代码模板
```

## 已沉淀的实战教训

- **HUG 设置**：仅作用于 Auto Layout FRAME，严禁对 GROUP / 非 Auto Layout FRAME 设 HUG（GROUP 自动包络会被污染）
- **长辈版特殊处理**：顶部头部 banner 不要作整体放大（1.3x 会超出 375 宽度被裁）
- **标签父容器联动**：严格遵守约束 A/B，仅紧贴 wrapper 才联动（否则画板高度会从 ~830 膨胀到 2000+）
- **INSTANCE 解绑**：detach 在预处理画板统一执行一次，自底向上 + 出错回滚；紊乱时降级为「跳过 detach、直接 rescale」
- **AutoLayout 预绑定默认 OFF**：保守路径（绝对定位 + 高度兜底）更稳定
- **textAutoResize 智能选择**：原 HEIGHT 保留，强行改 WIDTH_AND_HEIGHT 会让同行多文本互相覆盖（典型如商品标题挤穿价格）
- **字号上限阈值**：装饰大标题（大字版 ≥24pt / 长辈版 ≥26pt）继续放大会破坏顶栏 / 标题视觉版式
- **不动间距**：padding ×1.3 是错的，文字字号撑大容器后间距自然合理；呼吸感由"标签 / 图文徽章 / 特殊处理组件整体 rescale"承担
- **detach 出错回滚**：detach 后扫描根 Frame 子节点 y 离群即丢弃 clone 重做（跳过 detach），实测频繁触发，是稳定性的关键防御

## 版本

- **v2.2.1**（fork of upstream v2.2 + 一致性修复 + 去 Deco 输入源改造，2026-05-22 并入本仓库）
- 完整沿革见 [`UPSTREAM.md`](./UPSTREAM.md)
