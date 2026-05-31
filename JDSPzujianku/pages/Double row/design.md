---
file: design
bundle: page-doc
level: flow
bg: horizontal
slug: double-row
name_zh: "双列"
name_en: "Double row"

owner: "@1807611008"
contributors: []
status: draft
version: "0.1"
last_synced: "2026-05-31"

auto_detected:
  level: flow
  bg: horizontal ⚠️ fallback
  slug: "double-row" # ⚠️ fallback-from-page-name
  page_doc: true

relay_source:
  file_id: "1958051135088508929"
  page_id: "1758:1"
  node_id: "1758:251"
  node_name: "白皮书-短剧"
  node_type: FRAME
  bounds: { w: 1660, h: 1328 }
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=1758%3A1&node_id=1758%3A251"

bundle_files:
  - design.md
  - spec.md
  - variants.md
  - behaviors.md
  - ai-schema.yaml
  - CHANGELOG.md

references:
  uses_components:
    - "TODO: 基础内容卡 尚未录入 design.md，待后续补齐"
    - "TODO: 卡片标签 尚未录入 design.md，待后续补齐"
    - "TODO: 筛选项 尚未录入 design.md，待后续补齐"
    - "TODO: 用户头像 尚未录入 design.md，待后续补齐"
    - "TODO: 互动信息 尚未录入 design.md，待后续补齐"
    - "TODO: 返回.svg / 搜索.svg 图标资产待关联 icon 规范"

used_by: []
---

# 双列 · Double row

> 自动同步 2026-05-31 · skill v0.5.3 (page-doc bundle) · Relay [`1758:251`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=1758%3A1&node_id=1758%3A251)

## 这是 page-doc bundle

本页面规范来自 Relay page-doc 节点（高 1328px，42 个一层节点），内容包含双列 Feed 的布局、内容卡结构、切图资产和吸顶交互说明，已按 v0.5.1 multi-md bundle 模板拆分为 **6 份**：

| 文件 | 内容 | 章节来源 |
|---|---|---|
| **[spec.md](./spec.md)** | 视觉规范：colors / typography / radius / spacing / materials | 基础布局、内容卡拆解、页面示意 |
| **[variants.md](./variants.md)** | 形态 / 状态 / 坑位 / 子组件 各维度变体 | 内容卡比例、内容区、互动区、tab 吸顶 |
| **[behaviors.md](./behaviors.md)** | 应用场景 / 交互 / Donts / 多端适配 | 交互说明与待补充行为 |
| **[ai-schema.yaml](./ai-schema.yaml)** | 机器可读 schema（forms / slots / states / events） | 当前抽取结果 |
| **[CHANGELOG.md](./CHANGELOG.md)** | 跨 bundle 变更记录 | - |
| **design.md**（本文件） | frontmatter / Relay 章节大纲 / 链接索引 | - |

## 一句话定义

双列用于 Feed 场景中以两列瀑布流承载内容卡，支持 1:1 与 3:4 封面、内容文案、利益点、用户信息与互动数据组合展示。

## Relay 原稿章节大纲

| # | 标题 | 节点 ID | 高度 | 内容要点 | bundle 落点 | 对应 spec-page 章节 # |
|---|---|---|---:|---|---|---|
| 1 | 双列 / Feed 标题 | `1758:252` / `1758:253` | 80 / 27 | 页面规范标题与英文标识 | design.md | sec-1 |
| 2 | 基础布局 | `1758:255` | 122 | 文案：双列遵循栅格布局，特殊情况可自行处理 | spec.md / variants.md | sec-2 |
| 3 | 栅格与内容卡拆解 | `1977:106` 等 | 7-235 | 内容展示区、封面比例、关键信息、挂件、用户信息与互动属性 | spec.md / variants.md | sec-4 |
| 4 | 页面示意 | `1977:1` | 812 | 双列 Feed 页面，含顶部导航、二级 tab、内容卡瀑布流 | spec.md | sec-3 |
| 5 | 放大字号示意 | `1977:188` | 812 | 多个内容卡局部放大样式 | spec.md / variants.md | sec-4 |
| 6 | 吸顶交互 | `1977:377` / `2131:195` / `2131:234` | 28 / 44 / 44 | 文案：一级 tab 吸顶，二级 tab 吸顶 | behaviors.md | sec-5 |

## 关联

- 此组件归属：`level: flow`（page-doc bundle），`bg: horizontal`
- V16 Foundation 引用：见 [spec.md](./spec.md) 的 `uses_tokens`
- 位图切图清单：[_assets-cdn.md](./_assets-cdn.md)
- 父级页面：（待 L3 录入后由 skill 反向填 `used_by`）

## 变更记录

见 [CHANGELOG.md](./CHANGELOG.md)（v0.5.1：跨 bundle 变更记录搬到独立文件，design.md 保持薄 index 形态）。

---

## 本次自动同步发现的待办

- ⚠️ 稿件预检：整体 `⚠️ 待补充`，节点规模已通过阻断门但仍为 page-doc 量级（nodeCount 633）。
- ⚠️ `bg` 由 file_id 兜底推断为 `horizontal`，建议后续补充到 `bg-mapping.json`。
- ⚠️ 未抽到 `dimension_spec` 文本，尺寸规范主要来自节点几何。
- ⚠️ 多处颜色、字号、圆角、间距无法反查为 V16 token，详见 [spec.md](./spec.md)。
- ⚠️ `preview.png` 由于 Relay `base64Encode` 栈溢出未能落本地文件，需后续补导。
