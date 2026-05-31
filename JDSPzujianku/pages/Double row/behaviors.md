---
file: behaviors
bundle_part_of: design.md
slug: double-row
last_synced: "2026-05-31"
---

# 双列 · 交互 / 禁止 / 适配

> design.md → [index](./design.md) · 同 bundle: [spec](./spec.md) · [variants](./variants.md)

## 应用场景

### ✅ 用

- Feed 内容瀑布流，单屏需要展示更多内容入口时使用双列。
- 内容卡封面比例不完全一致，且允许通过错落高度提升浏览密度时使用。
- 商品、视频、直播、种草内容等需要组合封面、标题、利益点、用户信息和互动数据的场景。

### ❌ 不用

<!-- TODO: 设计师补充不适用场景，如强任务单列表、横向对比表格、强编辑表单等。 -->

## 交互

- 一级 tab：抽取文案为“一级tab吸顶，二级tab吸顶”。
- 二级 tab：当前稿件示意为吸顶，若业务根据信息重要程度调整，需要在页面级规范中补充条件。
- 内容卡点击、曝光、瀑布流加载、下拉刷新等行为未在当前 Relay 节点中明确标注，待业务页面补充。

## Donts

<!-- TODO: 当前 Relay 节点未抽到 dont_rule bucket，请设计师补充常见误用。 -->

## AI Schema

> v0.5.1 起抽到独立机器可读文件 → [`ai-schema.yaml`](./ai-schema.yaml)
>
> 含 forms / slots / states / layout / assets / events。卡片点击、曝光、加载等事件目前为 TODO。

## 多端适配

- 大字版：当前稿件包含“各放大1号”示意，正式适配比例与换行规则需结合长辈版/大字版规范复核。
- 小屏：保持 375 逻辑宽下双列，列宽与列间距不应压缩到文本不可读。
- 图片资产：封面和头像为 IMAGE fill，需走 `_assets-cdn.md` 登记并上传 CDN。

---

## 章节原文（来源 Relay）

> 一级tab吸顶，二级tab吸顶
