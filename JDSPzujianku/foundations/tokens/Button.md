# Button 按钮

**Zero page**: `1.8 按钮 🟢` (page `862:2634`)  
**Key nodeIds**: `862:2704` (48px primary), `862:2741` (44px primary), `862:2709` (44px service)  
**Guideline**: JD APP 15.0

---

## Size Variants

| Token key | Name          | Height | PaddingX | PaddingY | FontSize | FontWeight | Min-width |
|-----------|---------------|--------|----------|----------|----------|------------|-----------|
| `xl`      | 特定场景按钮   | 48px   | 20px     | 14px     | 18px     | 600        | 112px     |
| `lg`      | 页面主操作按钮 | 44px   | 16px     | 14px     | 15px     | 600        | 96px      |
| `md`      | 区块主操作按钮 | 40px   | 16px     | 11px     | 14px     | 600        | —         |
| `sm`      | 功能按钮       | 36px   | 12px     | 12px     | 12px     | 600        | —         |
| `xs`      | 标签按钮 32    | 32px   | 10px     | —        | 12px     | 400        | —         |
| `2xs`     | 标签按钮 28    | 28px   | 8px      | —        | 11px     | 400        | —         |
| `3xs`     | 标签按钮 24    | 24px   | 8px      | —        | 10px     | 400        | —         |

> **All sizes**: `borderRadius: 6px` (`radius.base`). Double-line content only available for `xl` and `lg`.

---

## Style Variants

| Variant     | Background  | Text color | FontWeight | Usage |
|-------------|-------------|------------|------------|-------|
| `primary`   | `#FF0F23`   | `#FFFFFF`  | 600        | 主要操作（红色填充）|
| `service`   | `#FFE7CC`   | `#664100`  | 600        | 次要操作（金色填充）购买决策 |
| `secondary` | `#FFF0F4`   | `#FF0F23`  | 500        | 次要操作（浅红填充）品牌表达 |

---

## States

| State             | Background  | Text color | Notes |
|-------------------|-------------|------------|-------|
| `default`         | variant bg  | variant fg | —     |
| `pressed`         | `#E53029`   | `#FFFFFF`  | 主按钮点击态（darker red）|
| `disabled`        | `#C2C4CC`   | `#FFFFFF`  | 标准禁用态 |
| `special-disabled`| `#FFADBE`   | `#FFFFFF`  | 特殊禁用（已选中但未满足条件）|

---

## Layout Rules

- **Full-width**: `width: 100%`, keep **12dp** safe margin on each side from screen edge
- **Min-width padding**: At least 20dp inner padding for `xl`, 16dp for `lg`
- **Flex layout**: `justifyContent: center`, `alignItems: center`, `gap: 6px` (icon ↔ text)
- **Icon support**: Left icon, right icon, or both. Size uses `icon.sizes.2xs` (16px)

---

## Double-Line Content (xl / lg only)

| Row       | FontSize | Weight | Opacity | Color |
|-----------|----------|--------|---------|-------|
| Primary   | 14px     | 600    | 1.0     | white |
| Secondary | 12px     | 400    | 0.80    | white |
| Gap       | 6px      | —      | —       | —     |

---

## Props API

```ts
interface ButtonProps {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs' | '3xs';
  variant?: 'primary' | 'service' | 'secondary';
  state?: 'default' | 'pressed' | 'disabled' | 'special-disabled';
  label: string;
  sublabel?: string;             // double-line secondary text (xl/lg only)
  leftIcon?: string;             // icon name e.g. "icon-cart"
  rightIcon?: string;
  fullWidth?: boolean;
  onClick?: () => void;
}
```

---

## React + Tailwind v3 Implementation

```tsx
import { FC } from 'react';
import { Icon } from '@/components/atoms/Icon';

const sizeStyles = {
  xl:  'h-12 px-5 py-3.5 text-lg font-semibold min-w-[112px]',
  lg:  'h-11 px-4 py-3.5 text-[15px] font-semibold min-w-[96px]',
  md:  'h-10 px-4 text-sm font-semibold',
  sm:  'h-9 px-3 text-xs font-semibold',
  xs:  'h-8 px-2.5 text-xs',
  '2xs':'h-7 px-2 text-[11px]',
  '3xs':'h-6 px-2 text-[10px]',
} as const;

const variantStyles = {
  primary:   'bg-[#FF0F23] text-white',
  service:   'bg-[#FFE7CC] text-[#664100]',
  secondary: 'bg-[#FFF0F4] text-[#FF0F23]',
} as const;

const stateStyles = {
  default:          '',
  pressed:          'bg-[#E53029]',
  disabled:         'bg-[#C2C4CC] text-white cursor-not-allowed',
  'special-disabled': 'bg-[#FFADBE] text-white cursor-not-allowed',
} as const;

export const Button: FC<ButtonProps> = ({
  size = 'lg',
  variant = 'primary',
  state = 'default',
  label,
  sublabel,
  leftIcon,
  rightIcon,
  fullWidth,
  onClick,
}) => {
  const isDisabled = state === 'disabled' || state === 'special-disabled';
  const activeVariant = isDisabled ? '' : variantStyles[variant];

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-1.5
        rounded-[6px]
        font-['PingFang_SC']
        transition-colors
        ${sizeStyles[size]}
        ${activeVariant}
        ${stateStyles[state]}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {leftIcon && <Icon name={leftIcon} size="2xs" />}

      {sublabel ? (
        <span className="flex flex-col items-center gap-1.5">
          <span className="text-sm font-semibold leading-[14px]">{label}</span>
          <span className="text-xs font-normal leading-[12px] opacity-80">{sublabel}</span>
        </span>
      ) : (
        label
      )}

      {rightIcon && <Icon name={rightIcon} size="2xs" />}
    </button>
  );
};
```

---

## Tailwind Config Extension

```ts
// tailwind.config.ts — add to theme.extend
{
  height: {
    'btn-xl': '48px',
    'btn-lg': '44px',
    'btn-md': '40px',
    'btn-sm': '36px',
  },
  colors: {
    'btn-primary': '#FF0F23',
    'btn-primary-pressed': '#E53029',
    'btn-primary-disabled': '#C2C4CC',
    'btn-primary-special': '#FFADBE',
    'btn-service-bg': '#FFE7CC',
    'btn-service-text': '#664100',
    'btn-secondary-bg': '#FFF0F4',
  },
}
```

---

## Output Directory

```
src/components/atoms/Button/
├── Button.tsx
├── Button.stories.tsx
└── index.ts
```

---

## Zero Reference Links

| Variant | Size | Zero Link |
|---------|------|-----------|
| Primary 48px | xl | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=862:2704) |
| Primary 44px | lg | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=862:2741) |
| Service 48px | xl | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=862:2709) |
| States spec  | —  | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=862:2729) |
