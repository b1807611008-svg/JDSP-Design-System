# Toast / Snackbar 轻提示

**Zero nodeId**: `1773:1445` (success variant) | `1773:1450` (action variant)  
**Guideline**: JD APP 15.0

## Overview

Toast is a non-blocking notification that appears briefly at the bottom of the screen. It may optionally include a leading icon and a trailing action link.

## Variants

| Variant | Description | nodeId |
|---------|-------------|--------|
| `default` | Text only | — |
| `icon-success` | Leading success icon + text | `1773:1450` |
| `icon-cancel` | Leading cancel icon + text | `1773:1445` |
| `with-action` | Text + trailing link (e.g. "去看看") | `1773:1450` |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Background | `color.bg.primary` | `#FFFFFF` |
| Box shadow | `shadow.toast` | `0px 4px 12px rgba(0,0,0,0.06)` |
| Backdrop blur | `shadow.card-blur` | `blur(8px)` |
| Border radius | `radius.xl` | `12px` |
| Padding | `spacing.3` | `12px` |
| Icon size | `icon.sizes.sm` | `16px` |
| Gap (icon + text) | `spacing.1` | `4px` |
| Font size | `typography.scale.md.fontSize` | `14px` |
| Font weight | `typography.weight.medium` | `500` |
| Text color | `color.text.primary` | `#1A1A1A` |

## Props API

```ts
interface ToastProps {
  message: string;
  icon?: 'success' | 'cancel' | 'refresh' | 'warning' | 'network-error' | 'mute';
  action?: { label: string; onClick: () => void };
  duration?: number; // ms, default 2000
}
```

## React + Tailwind Implementation

```tsx
import { FC } from 'react';
import { Icon } from '@/components/atoms/Icon';

export const Toast: FC<ToastProps> = ({ message, icon, action }) => (
  <div className="
    flex items-center gap-1 px-3 py-3
    bg-white rounded-xl
    shadow-[0px_4px_12px_rgba(0,0,0,0.06)]
    backdrop-blur-sm
    min-h-[40px]
  ">
    {icon && (
      <Icon
        name={`icon-${icon}`}
        size="sm"
        className="text-[#171A26] shrink-0"
      />
    )}
    <span className="text-sm font-medium text-[#1A1A1A] leading-4">
      {message}
    </span>
    {action && (
      <button
        onClick={action.onClick}
        className="ml-auto flex items-center gap-0.5 text-sm font-medium text-[#1A1A1A]"
      >
        {action.label}
        <Icon name="icon-arrow-right" size="sm" />
      </button>
    )}
  </div>
);
```

## Output Directory

```
src/components/atoms/Toast/
├── Toast.tsx
├── Toast.stories.tsx
└── index.ts
```
