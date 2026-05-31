---
name: JDSPDesignSkill
description: >
  当用户输入 /JDSP-ui 时触发（带或不带 Zero 链接均可）。
  【有链接】：用 zero MCP 读取节点 → 匹配规范 → 生成代码。
  【无链接】：仅凭本地 TOKENS.json + components/*.md 规范生成代码，无需 MCP。
  两种模式均输出 React + Tailwind v3 + TypeScript，
  文件结构：src/components/{atoms|composites|layouts|pages}/XXX/XXX.tsx + types.ts + index.ts。
  所有样式必须来自内嵌 Token 速查表，禁止魔法值。
  Icon：凡读 Zero / 选型 / 核对图标，仅允许 JDSP 规范稿 fileKey 1958051135088508929 的「1.3 icon图标」页（page 146:39，锚点节点 1487:10277），禁止其他 Relay 稿中的图标规范。
---

# /JDSP-ui — JDSP 组件代码生成

## 命令格式

```
/JDSP-ui [Zero节点链接]  [组件参数...]
```

| 模式 | 输入格式 | 触发逻辑 |
|------|---------|---------|
| **MCP 模式** | `/JDSP-ui https://relay.jd.com/...&node_id=xxx` | 调用 zero MCP 读取节点，再对照规范生成 |
| **本地模式** | `/JDSP-ui` 或 `/JDSP-ui 描述...` | 仅凭 TOKENS + 组件规范生成，不调用 MCP |

---

## 参数速查

```
/JDSP-ui [链接?] [组件名?] [variant?] [size?] [state?] [其他描述?]
```

| 参数 | 可选值 | 默认值 |
|------|--------|--------|
| 组件名 | Button / Tag / Modal / BottomSheet / Toast / Icon | 必填（或从链接推断）|
| variant | primary / service / secondary / outline / neutral | `primary` |
| size | xl / lg / md / sm / xs / 2xs / 3xs | `lg` |
| state | default / pressed / disabled / special-disabled | `default` |
| fullWidth | 带宽 / 不带宽 | `false` |
| sublabel | 双行文字内容 | 无 |

**无参数时默认**：`Button` 组件，`primary` 变体，`lg` 尺寸，`default` 状态。

---

## 调用示例

```bash
# 【本地模式】不带链接 — 默认生成标准主按钮
/JDSP-ui Button

# 【本地模式】指定变体+尺寸
/JDSP-ui Button service lg

# 【本地模式】自然语言参数
/JDSP-ui 生成一个次按钮，尺寸 lg，禁用状态
/JDSP-ui 金色购买按钮 区块大小 特殊禁用
/JDSP-ui 标签按钮 28dp 选中态
/JDSP-ui Toast 成功提示
/JDSP-ui Modal 两个操作按钮

# 【MCP 模式】带 Zero 链接
/JDSP-ui https://relay.jd.com/file/design?id=1958051135088508929&node_id=862:2704
/JDSP-ui https://relay.jd.com/file/design?id=1958051135088508929&node_id=862-3713
```

---

## ═══════════════ AGENT 执行逻辑 ═══════════════

读取本 SKILL.md 后，**必须**按以下逻辑执行，不得跳步。

---

### STEP 0 — 路由判断

```
输入中包含 "relay.jd.com" ?
  ├── YES → 走【MCP 路径】（STEP 1 → STEP 2 → STEP 3 → STEP 4 → STEP 5 → STEP 6 → STEP 7）
  └── NO  → 走【本地路径】（STEP 1L → STEP 3 → STEP 4 → STEP 5 → STEP 6L → STEP 7）
```

同时解析以下变量（后续步骤使用）：

```
COMPONENT   = 组件类型（从链接节点名 or 描述推断）
VARIANT     = variant 参数（默认 "primary"）
SIZE        = size 参数（默认 "lg"）
STATE       = state 参数（默认 "default"）
FULL_WIDTH  = boolean（默认 false）
SUBLABEL    = 双行副文字（仅 xl/lg 有效，默认无）
```

---

### STEP 1 [MCP 路径] — 读取 Zero 节点

解析 URL：
```
NODE_ID  = node_id 参数（破折号转冒号：36-62 → 36:62）
FILE_KEY = id 参数（当前文件默认：1958051135088508929）
```

**并行执行**：
```
① get_design_context(NODE_ID)  → 得到 inline-style React 代码
② get_screenshot(NODE_ID)      → 得到截图，作为视觉基准（后续核对用）
```

> 若调用失败（节点不存在）：提示用户确认链接，不要继续生成。

---

### STEP 1L [本地路径] — 解析本地规范

**不调用任何 MCP 工具**。

直接从以下来源获取规格数据：
1. 本文件「内嵌 Token 速查表」（颜色、尺寸、圆角、字体）
2. `components/{ComponentName}.md`（Props API、variants、states）

读取完毕后，构建以下渲染参数：
```
SPEC = {
  height:      根据 SIZE 从按钮尺寸表取值,
  paddingX:    同上,
  fontSize:    同上,
  fontWeight:  同上,
  bg:          根据 VARIANT + STATE 从颜色表取值,
  textColor:   同上,
  borderRadius: "6px" (按钮) / 对应组件值,
}
```

---

### STEP 2 [MCP 路径] — 映射 Token

将 `get_design_context` 返回的内联样式逐一替换为 Token（不允许原样照抄 inline style）：

| 内联样式 | Token / Tailwind class |
|---------|----------------------|
| `background:'#FF0F23'` | `bg-[#FF0F23]` |
| `background:'#E53029'` | `bg-[#E53029]` |
| `background:'#C2C4CC'` | `bg-[#C2C4CC]` |
| `background:'#FFADBE'` | `bg-[#FFADBE]` |
| `background:'#FFE7CC'` | `bg-[#FFE7CC]` |
| `background:'#FFF0F4'` | `bg-[#FFF0F4]` |
| `background:'#F5F6FA'` | `bg-[#F5F6FA]` |
| `background:'#FFFFFF'` | `bg-white` |
| `color:'#171A26'` | `text-[#171A26]` |
| `color:'#505259'` | `text-[#505259]` |
| `color:'#828794'` | `text-[#828794]` |
| `color:'#664100'` | `text-[#664100]` |
| `color:'#FF0F23'` | `text-[#FF0F23]` |
| `color:'white'` | `text-white` |
| `rgba(0,0,0,0.08)` | `border-black/[.08]` |
| `rgba(0,0,0,0.70)` | `style={{ background:'rgba(0,0,0,0.70)' }}` ← 例外，保留 |
| `borderRadius:6` | `rounded-[6px]` |
| `borderRadius:12` | `rounded-xl` |
| `borderRadius:20` | `rounded-[20px]` |
| `borderRadius:9999` | `rounded-full` |
| `fontSize:18, fontWeight:600` | `text-lg font-semibold leading-[18px]` |
| `fontSize:15, fontWeight:600` | `text-[15px] font-semibold leading-[15px]` |
| `fontSize:14, fontWeight:600` | `text-sm font-semibold leading-[14px]` |
| `fontSize:12` | `text-xs leading-[12px]` |
| `height:48` | `h-12` |
| `height:44` | `h-11` |
| `height:40` | `h-10` |
| `height:36` | `h-9` |
| `paddingLeft:20` | `px-5` |
| `paddingLeft:16` | `px-4` |
| `paddingLeft:12` | `px-3` |

---

### STEP 3 — 读取组件规范

查找对应规范文件（两种路径都需执行）：

| COMPONENT | 规范文件 | 目标目录 |
|-----------|---------|---------|
| Button | `components/Button.md` | `src/components/atoms/Button/` |
| Tag / PromoBadge | `components/Tag.md` | `src/components/atoms/Tag/` |
| Icon | `components/Icon.md` | `src/components/atoms/Icon/` |
| Toast | `components/Toast.md` | `src/components/composites/Toast/` |
| Modal | `components/Modal.md` | `src/components/composites/Modal/` |
| BottomSheet | `components/BottomSheet.md` | `src/components/composites/BottomSheet/` |
| InteractivePanel | `components/InteractivePanel.md` | `src/components/composites/InteractivePanel/` |
| InteractiveAvatar | `components/InteractiveAvatar.md` | `src/components/atoms/InteractiveAvatar/` |
| InteractiveActionItem | `components/InteractiveActionItem.md` | `src/components/atoms/InteractiveActionItem/` |
| InteractiveVolume | `components/InteractiveVolume.md` | `src/components/atoms/InteractiveVolume/` |
| InteractiveMusicDisc | `components/InteractiveMusicDisc.md` | `src/components/atoms/InteractiveMusicDisc/` |
| 其他未知组件 | — | 根据描述自行推断，可使用 `layouts/` / `pages/` 承载页面级拼装 |

从规范文件提取：
- Props 接口（所有字段）
- 所有 variants / sizes / states 的样式映射
- 特殊布局规则（如双行按钮、icon 位置）

---

### STEP 4 — 生成 3 个文件

**严格按以下模板生成**，不允许缺少任何文件：

#### 文件 1：`{ComponentName}.tsx`

```tsx
'use client'; // 若有事件处理则加，否则省略

import type { {ComponentName}Props } from './types';

// ── 样式映射表（const，放在组件外部）──────────────────────────
const SIZE_CLASS = { ... }   // 仅 Button/Tag 等多尺寸组件需要
const VARIANT_CLASS = { ... } // 变体样式
const STATE_CLASS = { ... }   // 状态覆盖样式

// ── 组件 ──────────────────────────────────────────────────────
export default function {ComponentName}(props: {ComponentName}Props) {
  // 解构 props，赋默认值
  // 组合 className（用数组 join，不用模板字符串拼接条件）
  // 返回 JSX
}
```

规则：
- 样式映射表用 `as const` + `Record<>` 类型
- className 用 `[...].filter(Boolean).join(' ')` 或 `clsx`（如项目有）
- `style={{}}` 仅用于 overlay rgba / linear-gradient，其余全用 Tailwind
- 所有可交互元素加 `aria-label`
- disabled 元素加 `disabled` attribute + `cursor-not-allowed`

#### 文件 2：`types.ts`

```ts
import type { ReactNode, MouseEventHandler } from 'react';

export interface {ComponentName}Props {
  // 所有 prop，可选项加 ?
  // variant/size/state 用 union literal type，不用 string
  // 示例：
  size?:    'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs' | '3xs';
  variant?: 'primary' | 'service' | 'secondary';
  state?:   'default' | 'pressed' | 'disabled' | 'special-disabled';
  label:    string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}
```

#### 文件 3：`index.ts`

```ts
export { default as {ComponentName} } from './{ComponentName}';
export type { {ComponentName}Props } from './types';
```

---

### STEP 5 — 代码自检

生成代码后，逐项检查（自动，不需要用户确认）：

- [ ] 是否有任何裸颜色值 `#XXXXXX` 出现在 className 之外？→ 必须移除
- [ ] 是否有 `style={{ color: 'xxx', fontSize: 'xxx' }}` 等非例外情况？→ 改为 Tailwind
- [ ] 所有 variant/size/state 是否都有对应映射？→ 无遗漏
- [ ] types.ts 中的 union 是否与 .tsx 中的映射表 key 一一对应？→ 必须一致
- [ ] index.ts 是否正确导出组件和类型？→ 检查

发现问题自动修正，无需提示用户。

---

### STEP 6 [MCP 路径] — 视觉核对

对照 STEP 1 截图，逐项核对生成代码：

| 核对项 | 方法 |
|-------|------|
| 高度 | h-xx 对应截图像素高度 |
| 圆角 | rounded-xxx 对应截图圆角视觉 |
| 颜色 | bg/text 颜色值与截图一致 |
| 字号 | text-xx 与截图文字大小匹配 |
| padding | px/py 值与截图留白匹配 |
| 状态覆盖 | disabled/pressed 颜色正确 |

不一致时自动修正代码，无需用户干预。

> **本地路径跳过此步**（无截图基准）。

---

### STEP 6L [本地路径] — 规范二次校验

对照规范文件「Layout Rules」章节，校验：
- 按钮是否按 size 使用了正确的 min-width（xl→112px, lg→96px）
- 双行内容是否只在 xl/lg 使用
- 标签按钮文字是否未使用 font-semibold（标签用 font-normal）
- 组件目录是否正确（原子/复合）

---

### STEP 7 — 输出摘要

代码文件输出后，**固定追加以下摘要块**：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ {ComponentName} 组件已生成（{模式：MCP|本地}）

📁 输出文件
   src/components/{atoms|composites}/{ComponentName}/
   ├── {ComponentName}.tsx    ({N} 行)
   ├── types.ts               ({N} 行)
   └── index.ts               (3 行)

🎨 使用的 Tokens
   {列出实际用到的 token 名称及值，每行一个}

⚙️  组件参数
   variant={VARIANT}  size={SIZE}  state={STATE}

{若 MCP 模式，追加：}
🔗 Zero 来源
   relay.jd.com/...&node_id={NODE_ID}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## ═══════════════ 内嵌 Token 速查表 ═══════════════

> Agent 直接查此表，无需读取 TOKENS.json 文件。

### 颜色 (Color)

```
── 品牌色 ──────────────────────────────────────────────
color.brand.primary          #FF0F23   bg-[#FF0F23]  text-[#FF0F23]
color.brand.primary-pressed  #E53029   bg-[#E53029]
color.brand.primary-disabled #C2C4CC   bg-[#C2C4CC]
color.brand.special-disabled #FFADBE   bg-[#FFADBE]
color.brand.primary-light    #FFF0F4   bg-[#FFF0F4]  (日间)  / #4C1C20 (夜间)
color.brand.gradient         linear-gradient(90deg, #FF475C 0%, #FF0F23 100%)

── 文字色 ──────────────────────────────────────────────
color.text.title             #171A26   text-[#171A26]   (夜间 #E6E6E6)
color.text.body              #505259   text-[#505259]   (夜间 #999999)
color.text.helper            #828794   text-[#828794]
color.text.white             #FFFFFF   text-white

── 按钮专用 ────────────────────────────────────────────
color.button.service-bg      #FFE7CC   bg-[#FFE7CC]
color.button.service-text    #664100   text-[#664100]   (夜间 #CCB8A3)
color.button.recommend       #14AD5D   text-[#14AD5D]

── 背景色 ──────────────────────────────────────────────
color.bg.page                #FFFFFF   bg-white          (夜间 #1F1F1F)
color.bg.secondary           #F5F6FA   bg-[#F5F6FA]      (夜间 #333333)
color.bg.spec                #F7F8FC   bg-[#F7F8FC]

── 边框/遮罩 ───────────────────────────────────────────
color.border.default         rgba(0,0,0,0.08)   border-black/[.08]
color.overlay.strong         rgba(0,0,0,0.70)   style={{ background:'rgba(0,0,0,0.70)' }}
color.overlay.light          rgba(0,0,0,0.40)   style={{ background:'rgba(0,0,0,0.40)' }}
```

### 按钮尺寸 (Button Sizes)

```
size  高度   paddingX  paddingY  fontSize  fontWeight  minWidth   lineHeight
──────────────────────────────────────────────────────────────────────────────
xl    48px   20px      14px      18px      600         112px      18px
lg    44px   16px      14px      15px      600         96px       15px
md    40px   16px      11px      14px      600         —          14px
sm    36px   12px      12px      12px      600         —          12px
xs    32px   10px      —         12px      400         —          12px
2xs   28px   8px       —         11px      400         —          11px
3xs   24px   8px       —         10px      400         —          10px

Tailwind 对应：
  xl  → h-12 px-5 py-3.5 text-lg leading-[18px] font-semibold min-w-[112px]
  lg  → h-11 px-4 py-3.5 text-[15px] leading-[15px] font-semibold min-w-[96px]
  md  → h-10 px-4 text-sm leading-[14px] font-semibold
  sm  → h-9 px-3 text-xs leading-[12px] font-semibold
  xs  → h-8 px-2.5 text-xs font-normal
  2xs → h-7 px-2 text-[11px] font-normal
  3xs → h-6 px-2 text-[10px] font-normal

所有按钮圆角：rounded-[6px]（radius.base = 6px）
icon ↔ 文字间距：gap-1.5（6px）
```

### 按钮变体 × 状态 对应色值

```
state\variant     primary              service              secondary
──────────────────────────────────────────────────────────────────────
default           bg:#FF0F23 白字 600  bg:#FFE7CC #664100 600  bg:#FFF0F4 #FF0F23 500
pressed           bg:#E53029 白字 600  (无明确规范，同 default)
disabled          bg:#C2C4CC 白字 600  bg:#C2C4CC 白字 600  bg:#C2C4CC 白字 600
special-disabled  bg:#FFADBE 白字 600  (无明确规范)
```

### 圆角 (Radius)

```
radius.base  6px     rounded-[6px]    ← 按钮统一使用
radius.md    8px     rounded-lg
radius.lg    12px    rounded-xl
radius.xl    20px    rounded-[20px]   ← Modal / BottomSheet
radius.2xl   24px    rounded-3xl
radius.full  9999px  rounded-full
```

### 字体 (Typography)

```
── 字体族 ──────────────────────────────────────────────
UI     → font-['PingFang_SC']
品牌   → font-['JingDongLangZhengTi']
数字   → font-['京东正黑体'] 或 tabular-nums

── 行高规则 ────────────────────────────────────────────
单行文本：lineHeight = fontSize（leading-[{n}px]）
多行文本：lineHeight = fontSize × 1.5，奇数则 -1
  示例：14px 多行 → 14×1.5=21 → 奇数-1 → leading-[20px]
  示例：16px 多行 → 16×1.5=24 → 偶数   → leading-[24px]
  示例：20px 多行 → 20×1.5=30 → 偶数   → leading-[30px]
```

### 阴影 / Z-index

```
shadow.card   → shadow-[0px_4px_12px_rgba(0,0,0,0.06)]
z-index       → overlay:300  modal:400  toast:500
```

### 互动区（07-右侧互动区）专用 Tokens

```
interactive.size.panel.width                 50px
interactive.size.panel.height-no-grass       319px
interactive.size.panel.height-with-grass     381px
interactive.size.avatarModule.height         83px
interactive.size.actionItem.height           62px
interactive.size.volume.chipWidth            69px
interactive.size.volume.chipHeight           30px

interactive.color.text-counter               #FFFFFF
interactive.color.text-counter-shadow        rgba(0,0,0,0.20)
interactive.color.live-badge-bg              #FF0F23
interactive.color.live-badge-text            #FFFFFF
interactive.color.ring-border-outer          rgba(255,15,35,0.5)
interactive.color.ring-border-inner          #FF0F23
interactive.color.chip-bg-immersive          rgba(255,255,255,0.90)
interactive.color.chip-text-immersive        #171A26
interactive.color.icon-default-immersive     #FFFFFF
interactive.color.icon-active-like           #FF0F23
interactive.color.icon-active-favorite       #FFFFFF
interactive.color.icon-active-grass          #14AD5D

interactive.typography.counter               11px/15px 500
interactive.typography.liveBadge             9px/11px 500
interactive.typography.volumeLabel           10px/10.91px 500
```

---

## ═══════════════ 完整示例 ═══════════════

### 示例 1 — 本地模式：默认主按钮

```
/JDSP-ui Button
```

**推断参数**：`variant=primary, size=lg, state=default`  
**执行路径**：STEP 0(本地) → STEP 1L → STEP 3 → STEP 4 → STEP 5 → STEP 6L → STEP 7

**生成代码**：

```tsx
// src/components/atoms/Button/Button.tsx
import type { ButtonProps } from './types';

const SIZE: Record<NonNullable<ButtonProps['size']>, string> = {
  xl:   'h-12 px-5 py-3.5 text-lg leading-[18px] min-w-[112px]',
  lg:   'h-11 px-4 py-3.5 text-[15px] leading-[15px] min-w-[96px]',
  md:   'h-10 px-4 text-sm leading-[14px]',
  sm:   'h-9 px-3 text-xs leading-[12px]',
  xs:   'h-8 px-2.5 text-xs',
  '2xs':'h-7 px-2 text-[11px]',
  '3xs':'h-6 px-2 text-[10px]',
};

const VARIANT: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:   'bg-[#FF0F23] text-white font-semibold',
  service:   'bg-[#FFE7CC] text-[#664100] font-semibold',
  secondary: 'bg-[#FFF0F4] text-[#FF0F23] font-medium',
};

const STATE_OVERRIDE: Record<NonNullable<ButtonProps['state']>, string> = {
  default:          '',
  pressed:          '!bg-[#E53029]',
  disabled:         '!bg-[#C2C4CC] !text-white cursor-not-allowed',
  'special-disabled':'!bg-[#FFADBE] !text-white cursor-not-allowed',
};

export default function Button({
  size = 'lg',
  variant = 'primary',
  state = 'default',
  label,
  sublabel,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onClick,
}: ButtonProps) {
  const disabled = state === 'disabled' || state === 'special-disabled';
  const cls = [
    'inline-flex items-center justify-center gap-1.5',
    'rounded-[6px] font-[\'PingFang_SC\'] transition-colors',
    SIZE[size],
    VARIANT[variant],
    STATE_OVERRIDE[state],
    fullWidth ? 'w-full' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className={cls}
    >
      {leftIcon && <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">{leftIcon}</span>}
      {sublabel ? (
        <span className="flex flex-col items-center gap-1.5">
          <span className="text-sm font-semibold leading-[14px]">{label}</span>
          <span className="text-xs font-normal leading-[12px] opacity-80">{sublabel}</span>
        </span>
      ) : (
        <span>{label}</span>
      )}
      {rightIcon && <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">{rightIcon}</span>}
    </button>
  );
}
```

```ts
// src/components/atoms/Button/types.ts
import type { MouseEventHandler, ReactNode } from 'react';

export interface ButtonProps {
  size?:      'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs' | '3xs';
  variant?:   'primary' | 'service' | 'secondary';
  state?:     'default' | 'pressed' | 'disabled' | 'special-disabled';
  label:      string;
  sublabel?:  string;
  leftIcon?:  ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  onClick?:   MouseEventHandler<HTMLButtonElement>;
}
```

```ts
// src/components/atoms/Button/index.ts
export { default as Button } from './Button';
export type { ButtonProps } from './types';
```

---

### 示例 2 — 本地模式：自然语言指定参数

```
/JDSP-ui 生成一个次按钮，尺寸 lg，禁用状态
```

**解析**：`COMPONENT=Button, VARIANT=secondary, SIZE=lg, STATE=disabled`  
**Token 查表**：
- STATE=disabled → `bg-[#C2C4CC] text-white cursor-not-allowed`  
- SIZE=lg → `h-11 px-4 py-3.5 text-[15px] font-semibold min-w-[96px]`

**输出** `Button.tsx` 中，STATE_OVERRIDE 生效，`!bg-[#C2C4CC] !text-white cursor-not-allowed` 覆盖 VARIANT 的 `bg-[#FFF0F4] text-[#FF0F23]`。

---

### 示例 3 — 本地模式：Tag 组件

```
/JDSP-ui Tag outline 选中态
```

**解析**：`COMPONENT=Tag, VARIANT=selected, SIZE=md`  
**读取**：`components/Tag.md` → selected: `bg-[#FFF0F4] text-[#FF0F23] border border-[#FF0F23]`

**生成**：`src/components/atoms/Tag/` 下 3 个文件。

---

### 示例 4 — MCP 模式：Zero 链接

```
/JDSP-ui https://relay.jd.com/file/design?id=1958051135088508929&node_id=862:2704
```

**解析**：`NODE_ID=862:2704`，推断 `COMPONENT=Button`  
**执行**：
1. `get_design_context("862:2704")` → 取到 `h:48, bg:#FF0F23, fontSize:18, br:6`  
2. `get_screenshot("862:2704")` → 存为视觉基准  
3. Token 映射：`bg-[#FF0F23] h-12 px-5 text-lg rounded-[6px]`  
4. 生成 3 个文件，STEP 6 对照截图核对

---

### 示例 5 — 本地模式：复合组件

```
/JDSP-ui Modal 带取消和确认按钮
```

**解析**：`COMPONENT=Modal, 双按钮模式`  
**读取**：`components/Modal.md`  
**输出目录**：`src/components/composites/Modal/`

---

## ═══════════════ 设计系统页面索引 ═══════════════

| 页面名称           | pageId      | 说明 |
|--------------------|-------------|------|
| 1.1 色彩           | `862:1`     | 全量 color token |
| 1.2 字体           | `862:252`   | 字阶、行高规则 |
| 1.3 icon图标 🟢    | `146:39`    | 60+ 线性图标（**图标规范唯一入口**，见下节） |
| 1.8 按钮 🟢        | `862:2634`  | Button 全规格 |
| 1.9 图像&标签🟢    | `862:3713`  | Tag / Badge |
| 07-右侧互动区 🟢   | `0:13090`   | 互动区组件库（根节点 `0:13091`） |
| 1.4 边框&圆角&阴影 | `862:533`   | Radius / Shadow |
| 弹窗               | `0:31005`   | Modal |
| 半弹层             | `172:985`   | BottomSheet |
| 引导/snackbar      | `112:579`   | Tooltip / Snackbar |
| toast              | `1188:2319` | Toast |
| loading、骨架      | `172:984`   | Loading / Skeleton |
| 底部通条           | `0:11863`   | BottomBar |
| 顶部tab            | `0:3770`    | TopTabBar |
| 搜索               | `1648:2`    | SearchBar |

**fileKey（当前）**：`1958051135088508929`

### Icon 规范唯一来源（强制）

凡涉及 **图标** 的下列行为，**只能**以 JDSP 规范稿为准，**禁止**引用其他任何 Relay 设计稿内的图标组件集、本地 ICON 页面或第三方文件的图标规范：

- 用 MCP 读取图标库 / 组件结构 / 截图核对；
- 在 Relay 中创建或替换图标 **Instance** 的主组件来源；
- 代码里 Icon 与 `components/Icon.md` 的对照（`Icon.md` 须与此锚点一致）。

**唯一允许的规范入口**（请在 Relay 中打开该稿后再调用 MCP）：

- **fileKey**：`1958051135088508929`
- **页面**：1.3 icon图标 🟢，`page_id=146:39`
- **锚点 node_id**：`1487:10277`（URL 中 `1487-10277` 须还原为冒号）

**规范链接**：[JDSP 1.3 icon — 锚点 `1487:10277`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=146%3A39&node_id=1487%3A10277)

> 业务稿（其他 `id=` 的 Relay 文件）内若存在自建「ICON」组件集，**不得**作为图标规范或 Instance 主组件来源；应回到上述 JDSP 页挑选主组件后再实例化到业务稿。

---

## ═══════════════ 强制规则 ═══════════════

### ✅ MUST
1. 每次调用先判断「有无链接」，走对应路径（MCP / 本地），不可混用
2. 本地模式下**严禁调用任何 MCP 工具**
3. 所有样式从上方「内嵌 Token 速查表」取值
4. 输出 **3 个文件**（tsx + types.ts + index.ts），不得缺少
5. variant / size / state 用 TypeScript union literal type，不用 `string`
6. 可交互元素加 `aria-label`；disabled 加 `disabled` attribute
7. **Icon**：核对或从 Zero 拉图标时，仅允许打开 **fileKey `1958051135088508929`** 且定位到 **page `146:39`、node `1487:10277`**（1.3 icon 图标）；不得用其他 Relay 文件的图标页或组件集替代
8. 代码结构与样式必须 **1:1 像素级还原** Zero 组件（尺寸、间距、字号、圆角、状态）
9. 代码生成时必须 **严格匹配 Zero 的组件树结构与层级关系**，禁止擅自扁平化或重排
10. 默认目录采用 `src/components/atoms/`、`composites/`、`layouts/`、`pages/` 四层分级

### ❌ MUST NOT
- 不允许在非例外情况使用 `style={{ color / fontSize / borderRadius }}` 内联样式
- 不允许照搬 `get_design_context` 的 inline style 原样输出
- 不允许 `md / sm / xs / 2xs / 3xs` 按钮使用 `sublabel` 双行
- 不允许 Modal / Toast / BottomSheet 放入 `atoms/` 目录
- 不允许非沉浸场景使用 `rgba(255,255,255,0.9)` 等沉浸色
- **不允许**从非 JDSP 规范稿（`1958051135088508929` 以外）读取或绑定图标规范；不允许把业务稿内的本地 ICON 集当作图标设计规范来源
- 不允许写死魔法值（颜色 / 字号 / 圆角 / 间距 / 阴影），必须引用 Tokens
