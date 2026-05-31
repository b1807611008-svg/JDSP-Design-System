---
zone: foundations
section: components-base
last_updated: 2026-04-29
---

# 基础组件库 · Components Base

> 京东 APP 全公司共用的原子组件。每个组件按 multi-md 结构维护(11 文件 + 2 目录,详见 [[../../design.md#section-2]])。
>
> **业务组件不在本目录**——业务组件下沉到 [[../../product-architecture/]] 各事业部目录。

---

## 6 大组件类目

| 类目 | 用途 | 组件数 | 文档 |
|---|---|---|---|
| 🎯 [[action/README.md]] | 操作类 | 8 | Button / IconButton / FAB / ButtonGroup / SegmentedControl / Link / FloatingButton / SocialButton |
| ✏️ [[input/README.md]] | 输入类 | 12 | Input / Textarea / Select / Picker / DatePicker / Checkbox / Radio / Switch / Slider / SearchBox / OTPInput / FormField |
| 🎴 [[display/README.md]] | 展示类 | 14 | Avatar / Badge / Tag / Card / Divider / Empty / Skeleton / Image / Price / Rating / Quote / Tooltip / Marquee / Marquee |
| 🧭 [[navigation/README.md]] | 导航类 | 8 | TabBar / NavBar / Tabs / Breadcrumb / Pagination / Stepper / BackTop / SideNav |
| 💬 [[feedback/README.md]] | 反馈类 | 7 | Toast / Dialog / Sheet / Lightbox / Loading / Spinner / ProgressBar |
| 📊 [[data/README.md]] | 数据类 | 6 | List / Table / Tree / Calendar / Chart / DataGrid |

**总计:55 个原子组件**(P1 阶段优先实现 25 个高频组件,其余 P2 补齐)。

---

## 组件成熟度状态

| 状态 | 含义 |
|---|---|
| `experimental` | 实验性,API 可能 break,仅内部试点 |
| `beta` | 测试中,可使用但需关注更新 |
| `stable` | 稳定,Breaking Change 需走治理 |
| `deprecated` | 已弃用,过渡期 6 个月后删除 |

---

## 跨组件通用约束

每个组件 ai-schema.md 都需要标注:

```yaml
a11y:
  min_touch_target: 44pt    # 所有可点击组件
  contrast_ratio: 4.5:1     # 文本元素
  voiceover_label: required # 所有交互组件
  reduce_motion: respect    # 所有动画组件

constraints:
  - HARDCODED_COLOR: forbidden
  - LOADING_BLOCKS_CLICK: required (for buttons / submit forms)
  - DISABLED_VIA_TOKEN: required (no opacity hack)
```

详见各组件目录的 `donts.md`。

---

## 组件命名规范

```
PascalCase 主名:Button / IconButton / TabBar
                 ^                  ^
                 单词首字母大写,无下划线/连字符

子组件用点:Button.Icon / TabBar.Item
            ^                  ^
            主.子,清晰嵌套关系
```

详见 [[../../ai-mechanism/naming-bem.md]]

---

## 维护

| 操作 | 流程 |
|---|---|
| 新增组件 | 走 [[../../horizontal/governance/contribution.md#new-component]] |
| 修改 API | 走 versioning(SemVer)|
| 弃用 | 标记 deprecated + 6 个月过渡期 |
