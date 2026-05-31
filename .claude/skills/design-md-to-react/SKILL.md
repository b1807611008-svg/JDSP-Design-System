---
name: design-md-to-react
description: 把 wiki design.md（单组件或 page-doc bundle）渲染成 React 18 + Tailwind v3 + TypeScript 组件代码。零输入，token 全部反查主稿 foundations/tokens/tokens.json（不内嵌 TOKENS、禁魔法值），每个组件输出 tsx + types.ts + index.ts 三文件。源自 JDSP-Design-System（Cursor /JDSP-ui skill）转写，token 对齐见 docs/notes/2026-05-22-jdsp-token-alignment.md。Triggered by /design-md-to-react 或 "把 X 的 design.md 生成 React 代码"、"design.md to code"、"生成 X 组件代码"。
allowed-tools: [Read, Write, Edit, Glob, Bash, mcp__zero-design__get_design_context, mcp__zero-design__get_screenshot, mcp__zero-design__get_design_metadata]
---

# /design-md-to-react · design.md → React 组件代码

把 JD 设计 wiki 的 `design.md` 渲染成 **React 18 + Tailwind CSS v3 + TypeScript** 组件代码。

这是一个 **design.md-to-code 生成器**，不是创意编码助手，也不是页面脚手架工具。职责是「**忠实把 design.md 已写明的规范翻译成组件代码**」—— token 不自己造，结构不自己改。

> ⚠️ **v0.1 骨架** —— 工作流 + 输出契约 + token 映射表已就位，端到端可执行脚本未写。路线图见 [`README.md`](README.md)。

## 这个 skill 做什么

设计师/工程师给一个 design.md（或 page-doc bundle），输出对应的 React 组件代码：

- 读 design.md 的 `Components` / `Visual` 章节（或 bundle 的 `spec.md` / `variants.md`）
- **token 全部反查主稿** `foundations/tokens/tokens.json` —— 每个 hex / 字号 / 圆角 / 间距都映射到一个 token，再由 token 映射成 Tailwind class
- 每个组件输出 **3 个文件**：`{Name}.tsx` + `types.ts` + `index.ts`
- variant / size / state 用 TS union literal type，样式映射表用 `as const` + `Record<>`
- 自动按组件类型分级落到 `atoms / composites / layouts / pages`

## 为什么不内嵌 TOKENS（与上游 JDSP 的关键差异）

本 skill 从 `b1807611008-svg/JDSP-Design-System` 的 Cursor skill `/JDSP-ui` 转写而来。上游把一份 `TOKENS.json` 内嵌进 skill —— 这会形成**双源**，与主稿 `tokens.json` 必然漂移（上游已实测漂移：`text.body` 内嵌写 `#505259`，主稿是 `#3d414d`）。

本 skill 的硬约束：**主稿 `foundations/tokens/tokens.json` 是唯一真源**，skill 内不存任何 token 值。映射规则见 [`references/token-class-map.md`](references/token-class-map.md)，对齐依据见 [`docs/notes/2026-05-22-jdsp-token-alignment.md`](../../../docs/notes/2026-05-22-jdsp-token-alignment.md)。

## 何时触发

| 场景 | 调用 |
|---|---|
| 用户调 `/design-md-to-react <slug>` | 直接走 |
| 用户说"把 X 的 design.md 生成 React 代码" / "design.md to code" / "生成 X 组件代码" | 主动调 |
| design.md 内容更新 → 同步重新生成组件代码 | 主动调 |

## 不适用场景

| 场景 | 该走哪里 |
|---|---|
| 从 Relay 抽稿生成 design.md | `relay-to-design-md` |
| 把 design.md 渲染成对外 HTML 规范页 | `design-md-to-spec-page` |
| 把 design.md 实例化回 Relay 设计稿 | `design-md-to-relay` |
| 审 design.md 是否合规 | `design-review` |
| 手上只有 Relay URL、还没有 design.md | 先跑 `relay-to-design-md`，再回本 skill |

## 职能边界（skill 矩阵）

```text
                            Relay
                          ↗   │   ↘
       relay-to-design-md ┘   │   └ design-md-to-relay
                              ↓
                          design.md ──┬─→ design-md-to-spec-page  → spec HTML
                                       ├─→ design-md-to-portal     → 总站
                                       └─→ design-md-to-react（本）→ React 代码
```

design.md 是中枢产物。本 skill 是它的**代码发布面**，与 spec-page（HTML 发布面）、portal（总站发布面）平级。

## 调用方式

```text
/design-md-to-react <design-md-path-or-slug>
/design-md-to-react <design-md-path-or-slug> --out <dir>
/design-md-to-react <design-md-path-or-slug> --component <Name>
```

例：

```text
/design-md-to-react jd-design-system-md-v16/horizontal/components-base/button/
/design-md-to-react button --component Button
```

零输入原则：只需 design.md 路径/slug，其余全部自动推断（组件名、分级目录、variant/size/state 矩阵），**不向用户弹问卷**。output shape 不清楚（例：要单组件还是整个 page-doc 的全部组件）时，问**一个**简练澄清问题再继续。

## 核心准则

1. **token 唯一真源** —— 所有颜色/字号/圆角/间距/阴影必须能反查到主稿 `tokens.json` 的某个 token；查不到的，停下来报告，不要写魔法值。
2. **1:1 还原** —— 尺寸、间距、字号、圆角、状态严格按 design.md；不擅自扁平化或重排组件树。
3. **不猜 output shape** —— design.md 是 page-doc bundle 时，默认只生成用户点名的组件；要"全部组件"须用户显式说。

## 执行流程

> v0.1 为骨架：流程与契约固定，Step 3-6 的可执行实现随路线图推进。

### Step 1 — 解析输入

- 接受 design.md 文件路径、bundle 目录、或 slug（slug 用 `Glob` 在 `jd-design-system-md*/` 下定位）。
- 读 frontmatter：`level` 决定输出目录分级，`relay_source` 留作追溯，`bundle: page-doc` 决定是否去读 `spec.md` / `variants.md`。

### Step 2 — 定位 token 真源

- 由 design.md 所在 wiki（`jd-design-system-md` = V15 / `jd-design-system-md-v16` = V16）确定对应的 `foundations/tokens/tokens.json`。
- 读入该 `tokens.json`。**这是本次生成唯一的值来源。**

### Step 3 — 读组件规范

从 design.md（单文件）或 `spec.md` + `variants.md`（bundle）提取：

- Props 接口（所有字段）
- variants / sizes / states 矩阵及各自样式
- 特殊布局规则（双行按钮、icon 位置、min-width 等）

### Step 4 — token → class 映射

把规范里每个视觉值，按 [`references/token-class-map.md`](references/token-class-map.md) 两跳映射：

```
design.md 视觉值  →  主稿 tokens.json token 路径  →  Tailwind class
```

查不到对应 token → 记入「未覆盖项」报告，不猜值。沉浸态 / scene 层 token（主稿尚未册封，见对齐报告 B4）当前**不支持**，命中则报告并跳过。

### Step 5 — 生成 3 个文件

按 [`references/output-contract.md`](references/output-contract.md) 的模板生成 `{Name}.tsx` + `types.ts` + `index.ts`，落到分级目录（见输出契约）。

### Step 6 — 自检

- 无 className 之外的裸 hex；无非例外的 `style={{}}`
- variant/size/state 三处（types union ↔ tsx 映射表 key ↔ design.md 矩阵）一一对应
- index.ts 正确导出
- 发现问题自动修，不打断用户

### Step 7 — 输出摘要

固定追加：输出文件清单（含行数）、用到的 token 列表（token 路径 + 值）、组件参数、design.md 来源路径、未覆盖项（如有）。

## Relay 直连模式（次要）

design.md 尚不存在、用户坚持直接给 Relay URL 时，可用 `mcp__zero-design__get_design_context` / `get_screenshot` 读节点临时生成。但**优先建议先跑 `relay-to-design-md`** 沉淀 design.md —— 直连模式不产生可追溯的 wiki 文档，仅作应急。

## 强制规则

### ✅ MUST
1. token 全部反查主稿 `tokens.json`；skill 内不存 token 值
2. 每组件输出 3 文件（`tsx` + `types.ts` + `index.ts`），不缺
3. variant/size/state 用 TS union literal type，不用 `string`
4. 样式映射表用 `as const` + `Record<>`；className 用 `[...].filter(Boolean).join(' ')`
5. 可交互元素加 `aria-label`；disabled 加 `disabled` attribute + `cursor-not-allowed`
6. 组件按类型落 `atoms / composites / layouts / pages` 四级目录

### ❌ MUST NOT
1. 不内嵌 TOKENS、不写魔法值（颜色/字号/圆角/间距/阴影）
2. 非例外情况不用 `style={{ color / fontSize / borderRadius }}` 内联样式（例外仅 overlay rgba / linear-gradient）
3. 不照搬 `get_design_context` 的 inline style 原样输出
4. 不让 `md/sm/xs` 等小尺寸按钮使用双行 `sublabel`
5. 不把 Modal / Toast / BottomSheet 放进 `atoms/`
6. 非沉浸场景不使用沉浸态色值
