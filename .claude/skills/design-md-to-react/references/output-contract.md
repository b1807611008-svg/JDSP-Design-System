# 组件输出契约

> design-md-to-react 的 Step 5 按本契约生成代码。每个组件**固定 3 文件**，不缺不并。

## 目录分级

按组件类型落四级目录（默认根 `src/components/`，可由 `--out` 覆盖）：

| 层级 | 目录 | 收什么 |
|---|---|---|
| atoms | `src/components/atoms/{Name}/` | 不可再拆的原子件：Button / Tag / Icon |
| composites | `src/components/composites/{Name}/` | 组合原子的复合件：Modal / Toast / BottomSheet |
| layouts | `src/components/layouts/{Name}/` | 页面骨架 / 区域容器 |
| pages | `src/components/pages/{Name}/` | page-doc 级整页拼装 |

判级依据 design.md frontmatter 的 `level`，再按组件语义微调。**Modal / Toast / BottomSheet 永远不进 `atoms/`。**

## 三文件模板

### 文件 1 — `{Name}.tsx`

```tsx
'use client'; // 仅当组件有事件处理时加，否则省略

import type { {Name}Props } from './types';

// ── 样式映射表（组件外部，as const + Record）─────────────
const SIZE: Record<NonNullable<{Name}Props['size']>, string> = { /* ... */ } as const;
const VARIANT: Record<NonNullable<{Name}Props['variant']>, string> = { /* ... */ } as const;
const STATE: Record<NonNullable<{Name}Props['state']>, string> = { /* ... */ } as const;

// ── 组件 ──────────────────────────────────────────────────
export default function {Name}({ /* 解构 + 默认值 */ }: {Name}Props) {
  const cls = [
    /* 固定基类 */,
    SIZE[size],
    VARIANT[variant],
    STATE[state],
  ].filter(Boolean).join(' ');

  return ( /* JSX */ );
}
```

约定：

- 样式映射表用 `as const` + `Record<NonNullable<...>, string>`，放组件外部
- className 组合用 `[...].filter(Boolean).join(' ')`（项目若已装 `clsx` 则用 `clsx`）
- `style={{}}` 仅允许 overlay rgba / linear-gradient，其余全 Tailwind class
- 可交互元素加 `aria-label`；disabled 态加 `disabled` attribute + `cursor-not-allowed`
- 状态覆盖用 `!` important 前缀覆盖 variant 基色（如 `!bg-[#c2c4cc]`）
- 严格按 design.md 的组件树层级，不擅自扁平化

### 文件 2 — `types.ts`

```ts
import type { MouseEventHandler, ReactNode } from 'react';

export interface {Name}Props {
  // variant / size / state 必须是 union literal type，不用 string
  size?:    'xl' | 'lg' | 'md' | 'sm';
  variant?: 'primary' | 'service' | 'secondary';
  state?:   'default' | 'pressed' | 'disabled';
  label:    string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}
```

union 的取值集必须与 design.md 的 variant/size/state 矩阵**逐项一致**，也必须与 `.tsx` 映射表的 key 一一对应。

### 文件 3 — `index.ts`

```ts
export { default as {Name} } from './{Name}';
export type { {Name}Props } from './types';
```

## 自检清单（Step 6）

- [ ] className 之外无裸 hex；无非例外的 `style={{}}`
- [ ] variant/size/state：design.md 矩阵 ↔ types union ↔ tsx 映射表 key，三处一致
- [ ] 每个 variant/size/state 都有映射，无遗漏
- [ ] index.ts 导出组件 + 类型
- [ ] 所有视觉值都能反查到 `tokens.json` 的 token（见 token-class-map.md）
- [ ] 小尺寸按钮（md/sm/xs）未使用双行 `sublabel`

## 输出摘要（Step 7）

代码生成后固定追加：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ {Name} 组件已生成

📁 输出文件
   src/components/{tier}/{Name}/
   ├── {Name}.tsx   ({N} 行)
   ├── types.ts     ({N} 行)
   └── index.ts     (2 行)

🎨 使用的 Token（路径 → 值）
   {逐行列出，值取自 tokens.json}

⚙️  组件参数
   variant / size / state 矩阵

📄 design.md 来源
   {路径}

⚠️ 未覆盖项（如有）
   {查不到 token 的值 / 命中沉浸态 scene 层的值}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
