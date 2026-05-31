# PR0 — JDSP-Design-System Token 对齐校验报告

> 日期 2026-05-22 · 闸门评审 · 决定 JDSP-Design-System 能否并入主流程

## 背景与范围

- **来源仓库**：`b1807611008-svg/JDSP-Design-System`(Cursor skill,产物 React+Tailwind+TS)
- **JDSP Relay 源**：`1958051135088508929`(设计规范-视频 / 京东 SP 内容生态),标注 "JD APP 15.0 GUIDELINE"
- **主流程 Relay 源（唯一真源）**：`1896756863949619202` → `jd-design-system-md/foundations/tokens/tokens.json`
- **已确认**：1958 是 1896 的**场景子集**(沉浸式视频)。因此 JDSP token 应当是 1896 的子集 + 视频场景扩展,凡冲突以 **1896 主稿为准**。
- 本报告对比的是 JDSP `.cursor/skills/JDSP-design-skill/TOKENS.json` 与 `tokens/*.md`。

## 结论摘要(闸门判定)

**有条件通过。** JDSP token 与主稿**语义骨架一致**,绝大多数色值能对上;但存在 4 个必须先处理的问题,处理完才能进 PR1:

| 编号 | 问题 | 阻断级别 |
|---|---|---|
| B1 | `text.body` 值冲突(JDSP TOKENS.json #505259 ≠ 主稿 #3d414d) | 🔴 必须修 |
| B2 | radius / spacing 标尺模型不同(JDSP 密集 t-shirt 梯,主稿为节制语义梯) | 🔴 必须修 |
| B3 | JDSP 内部不一致(TOKENS.json ↔ tokens/color.md ↔ typography.md 三处对不上) | 🔴 必须修 |
| B4 | 沉浸态 / immersive token 在主稿中不存在,需正式建场景层 | 🟡 需补建 |

**核心动作**:JDSP 并入后**不保留独立 `TOKENS.json`**,改为消费主稿 `tokens.json`;视频场景特有项以「场景扩展层」形式补进主稿,而非散落在 skill 内。

---

## 1. Color 对比

图例：✅ 一致 · 🔵 命名差异(值相同,可映射) · 🔴 值冲突 · 🆕 场景新增(主稿无)

| JDSP token | JDSP 值 | 主稿对应 | 主稿值 | 判定 |
|---|---|---|---|---|
| `brand.primary` | #FF0F23 | `color.brand.primary` | #ff0f23 | ✅ |
| `brand.primary-light` | #FFF0F4 / 夜#4C1C20 | `color.semantic.danger-subtle` / `palette.red.1` | #fff0f4 | 🔵 值同,JDSP 当"次按钮底色"用 |
| `brand.primary-pressed` | #E53029 | 主稿 `color-states` 标 TODO;`palette.red.7`=#e53029 | — | 🔵 值有出处,主稿未册封为 brand token |
| `brand.primary-disabled` | #C2C4CC | 主稿 `brand.primary-disabled`=#ffadbe | #ffadbe | 🔴 **命名错位** |
| `brand.primary-special-disabled` | #FFADBE | 主稿 `brand.primary-disabled` | #ffadbe | 🔴 同上:主稿"primary-disabled"=JDSP"special-disabled" |
| `brand.gradient` 止点 | #FF475C | `brand.primary-gradient-stop` | #ff475d | 🔴 **差 1 位**(5C vs 5D),需回稿核 |
| `text.title` | #171A26 | `neutral.text.primary` | #171a26 | 🔵 |
| `text.body` | #505259 | `neutral.text.secondary` | #3d414d | 🔴 **值冲突**(见 B1) |
| `text.helper` | #828794 | `neutral.text.tertiary` | #828794 | 🔵 |
| `text.inverse` | #FFFFFF | `neutral.text.on-color` | #ffffff | 🔵 |
| `button.service-bg` | #FFE7CC | `functional.service-gold-5` | #ffe7cc | 🔵 |
| `button.service-text` | #664100 | `functional.service-gold-strong` | #664100 | 🔵 |
| `bg.page` | #FFFFFF | `neutral.bg.surface` | #ffffff | 🔵 |
| `bg.secondary` | #F5F6FA | `neutral.bg.sunken` | #f5f6fa | 🔵 |
| `border.default` | rgba(0,0,0,.08) | `neutral.border.default` | #00000014 | 🔵 值等价 |
| `overlay.strong` | rgba(0,0,0,.70) | `neutral.mask.strong` | #000000b2 | 🔵 值等价 |
| `overlay.light` | rgba(0,0,0,.40) | `neutral.mask.medium` | #00000066 | 🔵 值等价 |
| `button.recommend-text` | #14AD5D | 无 | — | 🆕 种草场景文字色,主稿无 |
| `bg.spec` | #F7F8FC | 无 | — | 🆕 标"设计稿实测",疑似魔法值,**不建议册封** |
| `text-immersive.*` | rgba(255,255,255,.9/.7) | 无 | — | 🆕 沉浸态文字,见 B4 |
| `bg.immersive-panel/tag/deep` | rgba 系列 | 无 | — | 🆕 沉浸态背景,见 B4 |

**色彩结论**:常规态色值 100% 能映射回主稿(多为命名差异)。唯一真冲突是 `text.body`(B1)与 `gradient` 止点末位。immersive 系列是合法的场景扩展(B4)。

### B1 — `text.body` 值冲突(必须修)

- JDSP `TOKENS.json` → `text.body` = **#505259**
- JDSP 自己的 `tokens/color.md` → `color/text` = **#3d414d**
- 主稿 `neutral.text.secondary` = **#3d414d**

→ JDSP `TOKENS.json` 的 #505259 是错值。**以主稿 #3d414d 为准**,JDSP TOKENS.json 作废(本就要废,见核心动作)。

## 2. Typography 对比

| 维度 | JDSP | 主稿 | 判定 |
|---|---|---|---|
| 行高规则 | 单行=字号,段落×1.5 奇数-1 | `line-height.tight`=1 / `loose`=1.5 奇数-1 | ✅ 规则完全一致 |
| 字族 | ui/brand/number 三族 | `family.sans/brand/number` | 🔵 同字体不同命名标签 |
| 字阶 | 11 阶:9/10/11/12/14/15/16/18/20/24/80 | 5 阶基梯:10/12/14/15/18 + price 特例 24/18/15 | 🔴 **见 B2** |

### B2-typo — 字阶标尺越界

主稿是**刻意节制的 5 阶基梯**(10/12/14/15/18)+ price 特例(24/18/15),JDSP 多出 9 / 11 / 16 / 20 / 80 共 5 个非册封字号;另 `title-3` 把 24pt 当通用 section 标题用,而主稿 24pt 仅册封给 price(`size.special.price-l`),属**语义越界**。
JDSP `tokens/typography.md` 自承:13 组字族"需归并治理"、`font_size_15_7969` "需确认"、共 17 个 size。

- 9/11/16/20 部分来自视频场景真实需求(互动计数 11pt、昵称 16pt) → 走场景扩展层评估;
- `font_size_15_7969` 这类小数字号 = Relay Frame 残留值,**直接丢弃**。
- 决策需求:要么主稿基梯确实需要为视频场景扩档,要么 JDSP 字号属于 off-spec —— **这是设计决策,不能自动合并**。

## 3. Radius 对比

| JDSP | 值 | 主稿 | 值 | 判定 |
|---|---|---|---|---|
| `none` | 0 | `radius.0` | 0 | ✅ |
| `sm` | 4px | `radius.s` | 4px | 🔵 |
| `base` | 6px | `radius.base` | 6px | ✅ |
| `md` | 8px | `radius.detail` | 8px | 🔵 |
| `lg` | 12px | `radius.xl` | 12px | 🔵 |
| `2xl` | 24px | `radius.structural` | 24px | 🔵 |
| `full` | 9999px | `radius.full` | 9999px | ✅ |
| `xs` | **3px** | `radius.xs` | **2px** | 🔴 值冲突 |
| `xl` | 20px | 无 | — | 🆕 主稿无 20px 半径 |
| `endpoint` 0.5px / `sharp` 1.5px | — | 无 | — | 🆕 |

→ 值层基本对得上,但**命名体系完全不同**(JDSP t-shirt 梯 vs 主稿语义梯),且 `xs` 真冲突(3px vs 2px)。

## 4. Spacing 对比 — 🔴 模型不兼容

- **主稿**:value-keyed 精选集 `0/2/4/6/7/8/12/16/20/24/28/32/40`,带 `platform/shopping` 双梯度语义层 + `role` 层。是「塔式原理」体系。
- **JDSP**:index 密集梯 `1..18 → 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48/60/80`,无语义层。
- JDSP 多出 `10/14/36/44/48/60/80` 等主稿不册封的值;反过来主稿的 `7`(Feeds 横纵特殊值)JDSP 又没有。

→ 两者是**不同的间距哲学**。JDSP spacing 标尺**不可并入**,JDSP 组件须改用主稿 `spacing` + `spacing.semantic`。

## 5. Shadow / Motion / Icon

- **Shadow**:JDSP 定义 `0px 4px 12px rgba(0,0,0,.06)`;主稿 `shadow` 列在 **TODO**(15.0 暂未规范)。→ JDSP 这条可作为 shadow 规范的**输入候选**,但需主稿正式立项后才册封。
- **Motion**:JDSP TOKENS 无 motion;主稿 motion 体系完整。无冲突,JDSP 直接消费主稿即可。
- **Icon**:JDSP 主尺寸 36px(视频场景大图标)+ 功能 16/20px。主稿 `icon.size` s16/m20/l24。16/20 ✅ 对应 s/m;**36px 是视频场景新增**,需进场景层。JDSP icon 锚点页 146:39 须与主稿 icon foundation 节点核对(留待 PR2)。

## 6. B3 — JDSP 自身三处不一致(并入前必须收口)

JDSP 仓库内部就有矛盾,**不能带病并入**:

1. `TOKENS.json` `text.body` #505259 ↔ `tokens/color.md` `color/text` #3d414d —— 同色两值。
2. `tokens/color.md` 把 `background 1` 标为 "Light: #333333"、`background 2` 标为 "Light: #1f1f1f",但 `TOKENS.json` 里 #333333/#1f1f1f 是 `bg.secondary/bg.page` 的**夜间值** —— color.md 疑似把 dark 值误标成 Light。
3. `tokens/color.md` 大量 `N/A (MCP未返回)`、标注"跨命名空间重复";`typography.md` 13 字族"需归并治理"。

→ 这些是 Relay 抽取未收口的产物。**JDSP 的 `tokens/*.md` 不并入**,统一以主稿 `foundations/tokens/` 为准。

## 7. B4 — 沉浸态场景层(需补建)

JDSP 的 `text-immersive.*`、`bg.immersive-*`、icon 36px、互动区文字阴影 `0 1px 1px rgba(0,0,0,.2)` 都是**视频沉浸场景真实需要、主稿当前缺失**的项。主稿 `tokens.json` 的 `dark-mode` 也标着 TODO。

建议:不要把这些塞进 skill,而是在主稿建一个**场景扩展层**(如 `foundations/tokens/scenes/immersive.md` + tokens.json 内 `scene.immersive` 命名空间),由 1958 稿正式抽取一次,作为 1896 体系的合法子集登记。

---

## 处理决策清单(PR0 产出)

| 项 | 决策 |
|---|---|
| JDSP `TOKENS.json` | **废弃**。组件改为消费主稿 `tokens.json` |
| JDSP `tokens/*.md` | **不并入**。以主稿 `foundations/tokens/` 为唯一真源 |
| 常规态色值 | 已验证可 100% 映射回主稿,PR1 用映射表替换即可 |
| `text.body` #505259 | 丢弃,用主稿 #3d414d |
| `gradient` 止点 5C/5D | 回 Relay 核一位,以主稿 #ff475d 为默认 |
| radius / spacing 标尺 | JDSP 标尺废弃,组件改用主稿语义梯 |
| 字阶越界(9/11/16/20/80) | 升给设计决策:扩主稿基梯 or 判 off-spec。`15.7969` 直接丢 |
| immersive / icon-36 / shadow | 走 B4 场景扩展层,由 1958 正式抽取登记 |
| JDSP `design.md`(沉浸式视频流) | 收口后作为体系内首个场景 page-doc 样例 |

## 闸门判定

✅ **有条件放行 PR1**。前置条件:B1（text.body）、B3（内部不一致）随 PR1 一并以「映射到主稿」方式消除;B2（标尺）在 PR1 中通过「组件只引用主稿语义 token」绕过,字阶越界单独升设计决策;B4 拆为独立小 PR。

**下一步**:PR1 — 把 JDSP-design-skill 转写为 Claude Code skill `design-md-to-react`,token 全部指向主稿。
