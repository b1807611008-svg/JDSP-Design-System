'use client';

import type { IconProps, IconSize, IconColor } from './types';

// ── Size → Tailwind class ─────────────────────────────────────
// Grid: 48×48 母版; outputs: 12 / 16 / 20 / 24 / 36 / 48
const SIZE_CLASS: Record<IconSize, string> = {
  xs:  'w-3 h-3',      // 12px
  sm:  'w-4 h-4',      // 16px
  md:  'w-5 h-5',      // 20px
  lg:  'w-6 h-6',      // 24px
  xl:  'w-9 h-9',      // 36px — 互动区实显尺寸
  '2xl': 'w-12 h-12',  // 48px
} as const;

// ── Color token → Tailwind text class (drives currentColor) ──
// All icon assets use currentColor; set text-* to tint them.
const COLOR_CLASS: Record<IconColor, string> = {
  default:      'text-[#171A26]',  // color.text.title
  brand:        'text-[#FF0F23]',  // color.brand.primary
  muted:        'text-[#828794]',  // color.text.helper
  inverse:      'text-white',      // color.text.white
  'active-like':  'text-[#FF0F23]',  // interactive.color.icon-active-like
  'active-grass': 'text-[#14AD5D]',  // interactive.color.icon-active-grass
  recommend:    'text-[#14AD5D]',  // color.button.recommend
} as const;

export default function Icon({
  name,
  size = 'lg',
  color = 'default',
  spritePath = '/assets/icons/sprite.svg',
  className = '',
  'aria-label': ariaLabel,
  ...rest
}: IconProps) {
  const classes = [
    SIZE_CLASS[size],
    COLOR_CLASS[color],
    'flex-shrink-0',
    className,
  ].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      focusable="false"
      role={ariaLabel ? 'img' : undefined}
      {...rest}
    >
      <use href={`${spritePath}#${name}`} />
    </svg>
  );
}
