# Tag / Badge 标签

**Zero page**: `1.9 图像&标签🟢` (page `862:3713`)  
**Related page**: `1.8 按钮 🟢` 标签按钮 32/28/24dp section  
**Guideline**: JD APP 15.0

---

## Overview

Tags (标签) are small, non-interactive or lightly-interactive labels used to represent status, category, or metadata. They differ from Tag-Buttons in that they are purely informational or selected/unselected.

---

## Sizes

| Size | Height | PaddingX | PaddingY | FontSize | BorderRadius |
|------|--------|----------|----------|----------|--------------|
| `lg` | 32px   | 10px     | —        | 12px     | 6px          |
| `md` | 28px   | 8px      | —        | 11px     | 4px          |
| `sm` | 24px   | 8px      | —        | 10px     | 4px          |
| `xs` | —      | 6px      | 3px      | 11px     | 3px          |

---

## Variants

| Variant      | Background     | Text color  | Border                  | Usage |
|--------------|----------------|-------------|-------------------------|-------|
| `primary`    | `#FF0F23`      | `#FFFFFF`   | none                    | 促销标签 自营/plus |
| `light-red`  | `#FFF0F4`      | `#FF0F23`   | none                    | 品牌/种草标签 |
| `service`    | `#FFE7CC`      | `#664100`   | none                    | 服务/金标签 |
| `outline`    | transparent    | `#FF0F23`   | 1px `#FF0F23`           | 选中可操作标签 |
| `neutral`    | `#F5F6FA`      | `#505259`   | 1px `rgba(0,0,0,0.08)` | 普通筛选/规格标签 |
| `selected`   | `#FFF0F4`      | `#FF0F23`   | 1px `#FF0F23`           | 选中的规格标签 |
| `disabled`   | `#F5F6FA`      | `#C2C4CC`   | 1px `rgba(0,0,0,0.04)` | 禁用规格标签 |

---

## Special Tag: 促销角标 (Promo Badge)

Used inline with product titles (from typography page):
- Background: `#FF0F23`
- Text: white, `11px` `400`, lineHeight `10px`
- Padding: `3px 3px`
- BorderRadius: `3px`
- Example text: `自营`, `PLUS`, `闪购`

---

## Props API

```ts
interface TagProps {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  variant?: 'primary' | 'light-red' | 'service' | 'outline' | 'neutral' | 'selected' | 'disabled';
  label: string;
  leftIcon?: string;
}
```

---

## React + Tailwind v3 Implementation

```tsx
import { FC } from 'react';
import { Icon } from '@/components/atoms/Icon';

const TAG_SIZE: Record<NonNullable<TagProps['size']>, string> = {
  lg: 'h-8 px-2.5 text-xs',
  md: 'h-7 px-2 text-[11px]',
  sm: 'h-6 px-2 text-[10px]',
  xs: 'px-1.5 py-0.5 text-[11px]',
};

const TAG_VARIANT: Record<NonNullable<TagProps['variant']>, string> = {
  'primary':   'bg-[#FF0F23] text-white',
  'light-red': 'bg-[#FFF0F4] text-[#FF0F23]',
  'service':   'bg-[#FFE7CC] text-[#664100]',
  'outline':   'bg-transparent text-[#FF0F23] border border-[#FF0F23]',
  'neutral':   'bg-[#F5F6FA] text-[#505259] border border-black/[.08]',
  'selected':  'bg-[#FFF0F4] text-[#FF0F23] border border-[#FF0F23]',
  'disabled':  'bg-[#F5F6FA] text-[#C2C4CC] border border-black/[.04]',
};

export const Tag: FC<TagProps> = ({
  size = 'md',
  variant = 'neutral',
  label,
  leftIcon,
}) => (
  <span
    className={`
      inline-flex items-center justify-center gap-1
      rounded-[4px]
      font-['PingFang_SC'] font-normal leading-none
      ${TAG_SIZE[size]}
      ${TAG_VARIANT[variant]}
    `}
  >
    {leftIcon && <Icon name={leftIcon} size="3xs" />}
    {label}
  </span>
);

/** Promo badge variant (e.g. 自营, PLUS) */
export const PromoBadge: FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center justify-center px-0.5 py-[3px] rounded-[3px] bg-[#FF0F23] text-white text-[11px] font-normal leading-[10px]">
    {label}
  </span>
);
```

---

## Output Directory

```
src/components/atoms/Tag/
├── Tag.tsx
├── PromoBadge.tsx
└── index.ts
```
