# BottomSheet 半弹层

**Zero page**: `半弹层` (page `172:985`)  
**Guideline**: JD APP 15.0

---

## Overview

从屏幕底部滑入的弹层，用于选择、填写、操作等中等优先级场景。可带拖拽手柄，支持多种高度。

---

## Structure

```
┌──────────────────────────┐
│  overlay (mask_1)        │  rgba(0,0,0,0.70)
│                          │
│  ┌────────────────────┐  │
│  │  ── drag handle    │  │  4px × 32px, color: rgba(0,0,0,0.12), radius: 2px
│  ├────────────────────┤  │  paddingTop: 8px above handle
│  │  Title (optional)  │  │  18px 600 #171A26 centered
│  │  Content area      │  │  scrollable if overflow
│  │  Bottom actions    │  │
│  └────────────────────┘  │
└──────────────────────────┘
```

---

## Layout Tokens

| Property            | Value                     |
|---------------------|---------------------------|
| Overlay             | `rgba(0,0,0,0.70)`         |
| Border radius       | `20px 20px 0 0`           |
| Background          | `#FFFFFF`                  |
| Drag handle width   | `32px`                    |
| Drag handle height  | `4px`                     |
| Drag handle radius  | `2px`                     |
| Drag handle color   | `rgba(0,0,0,0.12)`        |
| Drag handle top gap | `8px`                     |
| PaddingX            | `16px`                    |
| PaddingBottom (safe)| `16px + safeAreaBottom`   |

---

## Height Variants

| Type         | Height behavior |
|--------------|----------------|
| `auto`       | fit content, max 90vh |
| `half`       | 50vh            |
| `full`       | 90vh (with safe area) |

---

## Props API

```ts
interface BottomSheetProps {
  visible: boolean;
  title?: string;
  height?: 'auto' | 'half' | 'full';
  showDragHandle?: boolean;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
}
```

---

## React + Tailwind v3 Implementation

```tsx
import { FC } from 'react';

export const BottomSheet: FC<BottomSheetProps> = ({
  visible,
  title,
  height = 'auto',
  showDragHandle = true,
  children,
  actions,
  onClose,
}) => {
  if (!visible) return null;

  const heightClass = {
    auto: 'max-h-[90vh]',
    half: 'h-[50vh]',
    full: 'h-[90vh]',
  }[height];

  return (
    <div
      className="fixed inset-0 z-[400] flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.70)' }}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-t-[20px] px-4 pb-[calc(16px+env(safe-area-inset-bottom))] ${heightClass} flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {showDragHandle && (
          <div className="flex justify-center pt-2 pb-4">
            <div
              className="w-8 h-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.12)' }}
            />
          </div>
        )}

        {title && (
          <h2 className="text-[#171A26] text-[18px] font-semibold leading-[18px] font-['PingFang_SC'] text-center mb-4">
            {title}
          </h2>
        )}

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {actions && (
          <div className="pt-4 border-t border-black/[.08]">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## Output Directory

```
src/components/composites/BottomSheet/
├── BottomSheet.tsx
└── index.ts
```
