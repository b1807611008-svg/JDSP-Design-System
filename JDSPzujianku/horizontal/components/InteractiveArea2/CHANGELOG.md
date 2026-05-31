---
file: CHANGELOG
component_name: InteractiveArea
slug: interactive-area
---

# Changelog

## 1.0.0 — 2026-05-25

### Added

- Created `InteractiveArea2` page-doc bundle under `JDSPzujianku/horizontal/components/InteractiveArea2/`.
- Added `design.md`, `spec.md`, `variants.md`, `behaviors.md`, `ai-schema.yaml`, and `CHANGELOG.md`.
- Reorganized the original mixed `InteractiveArea` documents into the same bundle logic used by `video-top-tab`.
- Preserved source ownership: `InteractiveAvatar.md` remains the avatar state source; `InteractiveActionItem.md` remains the action item and volume control source.

### Source

- Relay file: `1958051135088508929`
- Source page: `0:13090`
- Scope node: `1600:588`
- Key nodes: `633:4487`, `1600:1053`, `633:3418`, `823:3046`, `633:3616`, `1791:107`

### Notes

- This component belongs to Component Composition Layer.
- It references existing component docs, Tokens, Visual Atoms and icon assets.
- Legacy source docs are preserved under `JDSPzujianku/horizontal/components/InteractiveArea2/references/InteractiveArea/`.
- It does not create new base styles.

### Changed

- Added explicit source frontmatter audit against `video-top-tab` and legacy `InteractiveArea`.
- Extracted reusable contracts for composition order, avatar state matrix, action item behavior, volume control, and event payloads.
- Clarified that InteractiveArea2 changes logic organization only; legacy visual specs remain owned by the original child component docs.
