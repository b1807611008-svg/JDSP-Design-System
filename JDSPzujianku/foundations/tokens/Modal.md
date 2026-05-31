# Modal / 弹窗

**Zero page**: `弹窗` (page `0:31005`)  
**Guideline**: JD APP 15.0

---

## Overview

全屏遮罩弹窗，用于重要操作确认、信息展示等场景。与 `半弹层 (BottomSheet)` 的区别是：Modal 居中显示；BottomSheet 从底部滑入。

---

## Structure

```
┌─────────────────────────┐
│  overlay (mask_1)       │  rgba(0,0,0,0.70)
│  ┌───────────────────┐  │
│  │  Modal container  │  │  bg: white, borderRadius: 20px
│  │  ┌─────────────┐  │  │
│  │  │   Title     │  │  │  fontSize: 18px, weight: 600, color: #171A26
│  │  │   Content   │  │  │  fontSize: 14px, lineHeight: 22px, color: #505259
│  │  ├─────────────┤  │  │
│  │  │  Actions    │  │  │  paddingTop: 24px
│  │  │  [Cancel] [Confirm] │
│  │  └─────────────┘  │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

---

## Layout Tokens

| Property           | Value                   |
|--------------------|-------------------------|
| Overlay            | `rgba(0,0,0,0.70)` (`color.overlay.strong`) |
| Container width    | `calc(100vw - 64px)` or `327px` max |
| Border radius      | `20px` (`radius.xl`)    |
| Title font         | 18px, weight 600         |
| Title lineHeight   | 18px (single line)       |
| Content font       | 14px, weight 400         |
| Content lineHeight | 22px (paragraph)         |
| Action padding-top | 24px                     |
| Close button       | top-right, 24px × 24px   |

---

## Action Layout

| Type          | Button arrangement |
|---------------|--------------------|
| Single action | Full-width primary button |
| Two actions   | `[secondary lg] [primary lg]` side-by-side with 8px gap |

---

## Props API

```ts
interface ModalProps {
  title: string;
  content?: React.ReactNode;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
  onClose?: () => void;
  visible: boolean;
}
```

---

## React + Tailwind v3 Implementation

```tsx
import { FC } from 'react';
import { Button } from '@/components/atoms/Button';

export const Modal: FC<ModalProps> = ({
  title,
  content,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  onClose,
  visible,
}) => {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.70)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[20px] w-[calc(100vw-64px)] max-w-[327px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-[#828794]"
            onClick={onClose}
          >
            ×
          </button>
        )}

        <h2
          className="text-[#171A26] text-[18px] font-semibold leading-[18px] font-['PingFang_SC'] text-center"
        >
          {title}
        </h2>

        {content && (
          <div
            className="mt-3 text-[#505259] text-sm font-['PingFang_SC'] leading-[22px] text-center"
          >
            {content}
          </div>
        )}

        <div className={`mt-6 flex gap-2 ${secondaryLabel ? '' : ''}`}>
          {secondaryLabel && (
            <Button
              size="lg"
              variant="secondary"
              label={secondaryLabel}
              fullWidth
              onClick={onSecondary}
            />
          )}
          <Button
            size="lg"
            variant="primary"
            label={primaryLabel}
            fullWidth
            onClick={onPrimary}
          />
        </div>
      </div>
    </div>
  );
};
```

---

## Output Directory

```
src/components/composites/Modal/
├── Modal.tsx
└── index.ts
```

---

## Zero Reference

- Page: `弹窗` — `relay.jd.com/file/design?id=1958051135088508929&page_id=0:31005`
