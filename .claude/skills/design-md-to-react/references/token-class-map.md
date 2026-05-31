# token → Tailwind class 映射表

> design-md-to-react 的 Step 4 用本表把规范值翻译成 Tailwind class。
> **值的真源是主稿 `foundations/tokens/tokens.json`**（V15 = `jd-design-system-md/`，V16 = `jd-design-system-md-v16/`）。
> 本表只登记 token 路径与对应 class，**不登记值** —— 值变更只改 `tokens.json`，本表不动。
> 下方括注的 hex 仅为 V15 当前值，便于人工核对，不作为真源。

## 两跳映射原则

```
design.md 视觉值  →  tokens.json token 路径  →  Tailwind class
```

绝不跳过中间一跳直接 hex → class。查不到 token 路径的值，记入「未覆盖项」，不猜。

## 推荐：把 token 注入 tailwind.config（目标态）

骨架阶段用 arbitrary value（`bg-[#ff0f23]`）兜底。**正式接入时**应把 `tokens.json` 转成 `tailwind.config.js` 的 `theme.extend`，让 class 直接是语义名（`bg-brand-primary`）。转换脚本列入路线图 v0.3，见 [`README.md`](../README.md)。

---

## Color

| token 路径 | Tailwind class（arbitrary 兜底） | 目标语义 class | V15 值 |
|---|---|---|---|
| `color.brand.primary` | `bg-[#ff0f23]` / `text-[#ff0f23]` | `bg-brand-primary` | #ff0f23 |
| `color.brand.primary-gradient-stop` | `from-[#ff475d]`（配 `to-[#ff0f23]`） | — | #ff475d |
| `color.brand.primary-disabled` | `bg-[#ffadbe]` | `bg-brand-primary-disabled` | #ffadbe |
| `color.brand.primary-text-on` | `text-white` | — | #ffffff |
| `color.semantic.danger` | `text-[#ff0f23]` | `text-danger` | #ff0f23 |
| `color.semantic.danger-subtle` | `bg-[#fff0f4]` | `bg-danger-subtle` | #fff0f4 |
| `color.semantic.success` | `text-[#00d900]` | `text-success` | #00d900 |
| `color.semantic.success-strong` | `text-[#2aa32a]` | `text-success-strong` | #2aa32a |
| `color.semantic.warning` | `text-[#ffbf00]` | `text-warning` | #ffbf00 |
| `color.semantic.info` | `text-[#0073ff]` | `text-info` | #0073ff |
| `color.neutral.text.primary` | `text-[#171a26]` | `text-primary` | #171a26 |
| `color.neutral.text.secondary` | `text-[#3d414d]` | `text-secondary` | #3d414d |
| `color.neutral.text.tertiary` | `text-[#828794]` | `text-tertiary` | #828794 |
| `color.neutral.text.disabled` | `text-[#c2c4cc]` | `text-disabled` | #c2c4cc |
| `color.neutral.text.on-color` | `text-white` | — | #ffffff |
| `color.neutral.bg.surface` | `bg-white` | — | #ffffff |
| `color.neutral.bg.body` | `bg-[#f2f3f7]` | `bg-body` | #f2f3f7 |
| `color.neutral.bg.sunken` | `bg-[#f5f6fa]` | `bg-sunken` | #f5f6fa |
| `color.neutral.border.default` | `border-black/[.08]` | `border-default` | #00000014 |
| `color.neutral.mask.medium` | `style={{background:'#00000066'}}` ← 例外保留 | — | #00000066 (40%) |
| `color.neutral.mask.strong` | `style={{background:'#000000b2'}}` ← 例外保留 | — | #000000b2 (70%) |
| `color.functional.service-gold-strong` | `text-[#664100]` | `text-service-gold-strong` | #664100 |
| `color.functional.service-gold-5` | `bg-[#ffe7cc]` | `bg-service-gold-5` | #ffe7cc |

> **命名陷阱（来自 PR0 对齐报告）**：上游 JDSP 把 `#ffadbe` 叫 "special-disabled"、把 `#c2c4cc` 叫 "disabled"。
> 主稿口径相反：`#ffadbe` = `color.brand.primary-disabled`，`#c2c4cc` = `color.neutral.text.disabled`。
> **以主稿为准。** 上游 `text.body` 内嵌值 `#505259` 是错值，主稿 `color.neutral.text.secondary` = `#3d414d`。

## Typography

| token 路径 | Tailwind class | V15 值 |
|---|---|---|
| `typography.family.sans` | `font-['PingFang_SC']` | PingFang SC … |
| `typography.family.brand` | `font-['京东朗正体_V2.0']` | 京东朗正体 V2.0 |
| `typography.family.number` | `font-['京东正黑_V2.2'] tabular-nums` | 京东正黑 V2.2 |
| `typography.weight.regular` | `font-normal` | 400 |
| `typography.weight.semibold` | `font-semibold` | 600 |
| `typography.weight.bold` | `font-bold` | 700（数字限定） |
| `typography.size.10` | `text-[10px]` | 10pt |
| `typography.size.12` | `text-xs` (12px) | 12pt |
| `typography.size.14` | `text-sm` (14px) | 14pt |
| `typography.size.15` | `text-[15px]` | 15pt |
| `typography.size.18` | `text-lg` (18px) | 18pt |
| `typography.size.special.price-l` | `text-2xl` (24px) | 24pt |

> 移动端 dp 语境下 `pt` 按 1:1 折算为 `px`。
> **行高规则**（`typography.line-height`）：单行 `leading-[{fontSize}px]`（tight=字号×1）；
> 段落 `leading-[{fontSize×1.5}px]`，结果为奇数则 −1（loose）。例：14 多行 → 21 → −1 → `leading-[20px]`。
> `role.*`（heading-page / body-standard / price-large 等）= size+weight+family 组合，按各自引用展开。

## Radius

Tailwind v3 默认梯度与主稿基本对齐，优先用命名 class：

| token 路径 | Tailwind class | V15 值 |
|---|---|---|
| `radius.0` | `rounded-none` | 0 |
| `radius.xs` | `rounded-sm` | 2px |
| `radius.s` | `rounded-[4px]` | 4px |
| `radius.base` | `rounded-md` | 6px |
| `radius.detail` | `rounded-lg` | 8px |
| `radius.xl` | `rounded-xl` | 12px |
| `radius.structural` | `rounded-3xl` | 24px |
| `radius.full` | `rounded-full` | 9999px |
| `radius.role.button` | → `radius.base` → `rounded-md` | 6px |
| `radius.role.modal` | → `radius.xl` → `rounded-xl` | 12px |
| `radius.role.tag` | → `radius.s` → `rounded-[4px]` | 4px |

> 上游 JDSP 的 `radius.xs=3px`、`radius.xl=20px` 与主稿冲突 —— **不采用**，按主稿梯度走。

## Spacing

主稿 spacing 是精选集 + `semantic`（platform/shopping 双梯度）+ `role` 层。组件**只引用 `semantic` / `role` 语义层**，不直接引数字键。

| token 路径 | Tailwind class | V15 值 |
|---|---|---|
| `spacing.4` | `gap-1` / `p-1` | 4px |
| `spacing.6` | `gap-1.5` / `p-1.5` | 6px |
| `spacing.8` | `gap-2` / `p-2` | 8px |
| `spacing.12` | `gap-3` / `p-3` | 12px |
| `spacing.16` | `gap-4` / `p-4` | 16px |
| `spacing.role.icon-text-gap` | → `spacing.4` → `gap-1` | 4px |
| `spacing.role.page-edge` | → `spacing.16` → `px-4` | 16px |
| `spacing.semantic.platform.normal` | → `spacing.8` → `gap-2` | 8px |
| `spacing.semantic.shopping.normal` | → `spacing.6` → `gap-1.5` | 6px |

> 上游 JDSP 的密集 t-shirt 间距梯（含 10/14/36/44/48/60/80）**不采用**。规范若出现这些值，记入「未覆盖项」交设计决策。

## Icon

| token 路径 | 像素 | V15 值 |
|---|---|---|
| `icon.size.s` | `w-4 h-4` (16px) | 16px |
| `icon.size.m` | `w-5 h-5` (20px) | 20px |
| `icon.size.l` | `w-6 h-6` (24px) | 24px |

> 图标**资源**（svg / sprite / `<Icon>`）的接入是 PR2 范围，本表只覆盖尺寸。
> 图标规范唯一入口是主稿 icon foundation 节点，不引业务稿自建 ICON 集。

## Motion

| token 路径 | Tailwind class | V15 值 |
|---|---|---|
| `motion.duration.s` | `duration-150` | 150ms |
| `motion.duration.m` | `duration-200` | 200ms |
| `motion.duration.l` | `duration-300` | 300ms |
| `motion.easing.standard` | `ease-[cubic-bezier(0.4,0,0.4,1)]` | — |
| `motion.easing.decelerate` | `ease-[cubic-bezier(0,0,0,1)]` | — |
| `motion.role.toast-enter` | duration-200 + decelerate | — |

## ⚠️ 暂不支持 — 沉浸态 / scene 层

主稿 `tokens.json` 当前**没有**沉浸态 token（`text-immersive`、`bg.immersive-*`、icon 36px、文字阴影、shadow 体系）—— 见对齐报告 B4。

design.md 命中这类值时：**报告并跳过**，不擅自映射、不写魔法值。待 B4 的场景扩展层（`tokens.json` 的 `scene.immersive` 命名空间）从 Relay 1958 正式抽取登记后，再补进本表。
