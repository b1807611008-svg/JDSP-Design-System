---
name: 规范复现HTML的输出路径
description: 从token/component md复现为HTML时，输出目标为JDSPzujianku/，不写入docs/
type: feedback
---

规范复现产物（typography-spec.html、color-spec.html、icon-spec.html 等）写入 `JDSPzujianku/`，不写入 `docs/`。

组件私有资产（如 video-top-tab 的 spec.md、assets/icons/）也写入 `JDSPzujianku/foundations/components/<component>/`，不写入 `jd-design-system-md-v16/horizontal/`。

**Why:** 用户明确指出"不要覆盖写入docs文件下，而是写在JDSPzujianku/这个文件中"；video-top-tab 等新建组件文件同样归属 JDSPzujianku。

**How to apply:** 每次把 token/component md 复现为 HTML，或新建组件 spec / icon 资产时，输出路径前缀统一用 `JDSPzujianku/`（组件：`JDSPzujianku/foundations/components/<slug>/`）。