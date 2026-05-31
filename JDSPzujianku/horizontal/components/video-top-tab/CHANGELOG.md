---
file: CHANGELOG
component_name: VideoTopTab
slug: video-top-tab
---

# Changelog

## 1.1.1 — 2026-05-28

### Changed

- Updated quick-return documentation from Relay node `2125:33`.
- Clarified default immersive TabList remains `275×44`; quick-return does not reserve space in default state.
- Clarified quick-return appears beside search after TabList leaves the default anchor; search is not hidden or replaced.
- Added swiped-state layout: TabList shrinks to `247×44`, right function area becomes quick-return `44×44` + search `44×44` (`72×44` total).

### Relay

- Source file: `1958051135088508929`
- Source page: `0:3770`
- Quick-return layout node: `2125:33`

## 1.1.0 — 2026-05-26

### Changed

- Updated VideoTopTab documentation from Relay node `2075:6916`.
- Added full horizontal swipe behavior for all first-level Tabs.
- Added left / right edge fade rules for scrollable TabList.
- Added tab switching feedback: selected sync, indicator movement, and auto-scroll into visible range.
- Added left / right function area interaction rules: side drawer / home return on the left, search / quick-return on the right.
- Updated Tab typography reference to Relay `2075:6916`: 16dp, Medium.
- Added immersive text / icon readability notes: selected white, unselected white 80%, shadow blur 1 / y 1 / black 20%.

### Relay

- Source file: `1958051135088508929`
- Source page: `0:3770`
- Interaction update node: `2075:6916`

## 1.0.0 — 2026-05-25

### Added

- Created VideoTopTab page-doc bundle under `JDSPzujianku/horizontal/components/video-top-tab/`.
- Added `design.md`, `spec.md`, `variants.md`, `behaviors.md`, `ai-schema.yaml`, and `CHANGELOG.md`.
- Registered component dependencies on `tokens/color.md`, `tokens/typography.md`, `tokens/spacing.md`, `tokens/radius.md`, `tokens/shadow.md`, and `visual/Icon.md`.
- Preserved existing private navigation assets in `assets/icons/`.
- Documented container, TabItem, indicator, navigation slots, dropdown, activity, sticky, immersive, scrollable and noise-reduction rules.

### Relay

- Source file: `1958051135088508929`
- Source page: `0:3770`
- Scope node: `771:1106`
- Latest application node: `518:2141`（非沉浸流）
- Immersive application node: `2084:44` / `2084:10`
- Previous application node: `2084:1`
- Key sections: display rules, tab switching, activity configuration, noise reduction.

### Changed

- Restructured `spec-page.html` Demo to **流类型**（immersive / standard）× **样式**（default / dark）二维切换；同步更新 `design.md`、`spec.md`、`variants.md`、`behaviors.md`、`ai-schema.yaml`。
- Aligned immersive demo to Relay `2084:44`: hide back slot, TabList viewport 275×44, track right-anchored with left「关注」peek, seamless gap to search slot.
- Removed noise-reduction demo mode from `spec-page.html` switcher (variant docs retained).
- Aligned non-immersive layout to Relay `518:2141`: 362×44 content area, back 28×44, TabList viewport 246×44, menu/search 44×44 hit.
- Removed activity mode from `spec-page.html` demo switcher (activity variant docs retained; demo not implemented yet).
- Aligned top application state to Relay `2084:1`: max 5 visible tabs, TabItem 51×44, tab gap 2, private icon hit 44×44 / visual 22×22.
- Clarified that selected label and underline indicator inherit current text color and must not use highlight color.
- Fixed `spec-page.html` demo: `.vtt-icon` container 44×44, inner `<img>` 22×22 (was incorrectly sizing icon to 44×44).

### Notes

- This component belongs to Component Composition Layer.
- It references existing Tokens, Visual Atoms and Private Assets.
- It does not create new base styles.
