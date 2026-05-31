import type { SVGAttributes } from 'react';

// ── Icon Names ────────────────────────────────────────────────
// Line (视频-线)
export type IconNameLine =
  // Navigation
  | 'icon-arrow-left'
  | 'icon-arrow-right'
  | 'icon-arrow-up'
  | 'icon-arrow-down'
  | 'icon-more'
  | 'icon-more-vertical'
  | 'icon-category'
  // Actions
  | 'icon-close'
  | 'icon-add'
  | 'icon-add-plus'
  | 'icon-delete'
  | 'icon-edit'
  | 'icon-copy'
  | 'icon-refresh'
  | 'icon-share'
  | 'icon-forward'
  | 'icon-search'
  | 'icon-maximize'
  | 'icon-minimize'
  // Social & Engagement
  | 'icon-like'
  | 'icon-heart'
  | 'icon-heart-add'
  | 'icon-heart-broken'
  | 'icon-star'
  // Communication
  | 'icon-message'
  | 'icon-chat'
  | 'icon-comment-check'
  | 'icon-comment-mute'
  | 'icon-bell'
  // Media
  | 'icon-volume'
  | 'icon-volume-mute'
  | 'icon-autoplay'
  | 'icon-landscape'
  // Commerce & User
  | 'icon-cart'
  | 'icon-user'
  | 'icon-location'
  | 'icon-grid'
  | 'icon-browse'
  | 'icon-eye'
  // System & Files
  | 'icon-model'
  | 'icon-file'
  | 'icon-folder'
  | 'icon-block'
  | 'icon-bullet'
  // Status / Emotion
  | 'icon-warning'
  | 'icon-happy'
  | 'icon-sad'
  | 'icon-smile';

// Fill (视频-面)
export type IconNameFill =
  // Navigation – Fill
  | 'icon-arrow-down-fill'
  | 'icon-arrow-up-fill'
  | 'icon-arrow-right-fill'
  // Media – Fill
  | 'icon-play-fill'
  | 'icon-clock-fill'
  | 'icon-volume-fill'
  | 'icon-volume-mute-fill'
  // Social & Engagement – Fill
  | 'icon-heart-fill'
  | 'icon-star-fill'
  | 'icon-like-fill'
  | 'icon-follow-added-fill'
  // Actions – Fill
  | 'icon-copy-fill'
  // Commerce – Fill
  | 'icon-gift-fill';

// Interactive (互动区专属，含 default/active 双态)
export type IconNameInteractive =
  | 'icon-like-default'
  | 'icon-like-active'
  | 'icon-grass-default'
  | 'icon-grass-active'
  | 'icon-comment-default'
  | 'icon-share-default';

export type IconName = IconNameLine | IconNameFill | IconNameInteractive;

// ── Size ─────────────────────────────────────────────────────
// xs=12  sm=16  md=20  lg=24  xl=36  2xl=48
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// ── Color Token ──────────────────────────────────────────────
// Maps to Tailwind text-color classes via currentColor
export type IconColor =
  | 'default'    // color.text.title  → text-[#171A26]
  | 'brand'      // color.brand.primary → text-[#FF0F23]
  | 'muted'      // color.icon.muted   → text-[#828794]
  | 'inverse'    // color.text.white   → text-white
  | 'active-like'    // interactive.color.icon-active-like   → text-[#FF0F23]
  | 'active-grass'   // interactive.color.icon-active-grass  → text-[#14AD5D]
  | 'recommend';     // color.button.recommend → text-[#14AD5D]

// ── Props ─────────────────────────────────────────────────────
export interface IconProps
  extends Omit<SVGAttributes<SVGSVGElement>, 'color' | 'name'> {
  /** Icon identifier — must match a symbol id in sprite.svg */
  name: IconName;
  /** Rendered size (maps to w/h Tailwind class) @default 'lg' */
  size?: IconSize;
  /** Semantic color token @default 'default' */
  color?: IconColor;
  /** Path to the SVG sprite file @default '/assets/icons/sprite.svg' */
  spritePath?: string;
  /** Extra Tailwind classes (for one-off overrides) */
  className?: string;
}
