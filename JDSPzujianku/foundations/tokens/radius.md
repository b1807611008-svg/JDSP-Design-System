---
token_category: radius
version: 1.0.0
last_updated: 2026-05-22
relay_source: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=862%3A533"
extraction_node: "862:534 (边框&圆角&阴影)"
sync_status: "synced — 7 radius levels extracted from node 862:570 text labels + shape cornerRadius validation"
---

# Radius Token 规范

## 文档概述与设计理念

圆角体系基于"感知友好 × 层级明确"的双核原则：

- **层级感知**：圆角值越大，元素在视觉上越「软」越「友好」，用于更重要的互动单元（按钮、卡片）；圆角越小，元素越「硬」越「精确」，用于辅助性信息标注（标签角标）。
- **7 阶离散体系**：设计稿明确定义了 0 / 2 / 4 / 6 / 8 / 12 / 24 pt 共 7 个离散档位（圆角7~圆角1），禁止在档位之间插值。
- **全屏圆形**：头像、圆形 Badge 等使用 `radius_max`（999pt / 50%），不纳入 7 阶体系，单独处理。
- **单位**：所有值以 **pt** 为设计单位（1pt = 2px @ 2x / 3px @ 3x），下表输出 pt 值，工程师按屏幕密度换算。

---

## 基础阶梯 / Atom 层

> 数据来源：节点 `862:570`（圆角规范段落），文本标注 + 形状 `cornerRadius` 属性双重校验。

| Token 命名 | 设计稿标注 | pt 值 | px 值（@2x） | 常见用途描述 |
|:---|:---|:---:|:---:|:---|
| `radius_sharp` | 圆角7 | 0 pt | 0 px | 直角元素：进度条轨道、分割线、纯色 Banner 底层容器 |
| `radius_xs` | 圆角1 | 2 pt | 4 px | 极细标注元素：资源入口标签、推荐理由标签、头像侧面角标、侧滑小窗头像边框 |
| `radius_sm` | 圆角2 | 4 pt | 8 px | 小型标签 Tag、角标 Badge、次级功能按钮（高度 28/32/36 pt 档位） |
| `radius_md` | 圆角3 | 6 pt | 12 px | 导航 Tab 选中指示器、功能工具栏容器、普通内容容器 |
| `radius_lg` | 圆角4 | 8 pt | 16 px | 标准卡片（商品卡、内容卡）、列表类目容器、输入框 |
| `radius_xl` | 圆角5 | 12 pt | 24 px | 大型卡片、弹层容器（Toast / Sheet / 通栏卡片）、活动弹窗 |
| `radius_pill` | 圆角6 | 24 pt | 48 px | 胶囊按钮（顶部分类 Tab、搜索框）、逛赚任务弹层、大圆角品牌容器 |
| `radius_max` | 全圆（自定） | 999 pt | — | 头像 Avatar、圆形图标按钮；实现方式：`border-radius: 50%` 或超大固定值 |

### 数据验证

以下为 MCP `use_design_script` 从实际形状节点读取的 `cornerRadius` 值，与文本标注对照：

| 形状节点 ID | 节点名称 | `cornerRadius`（API 原始值） | 对应 Token |
|:---|:---|:---:|:---|
| `862:584` | Radius/2（圆角1 演示） | 2 | `radius_xs` |
| `862:622` | Radius/2（圆角2 演示） | 10 ⚠️ | 演示用图形缩放，标注为 4pt |
| `862:576` | Radius/2（圆角3 演示） | 12 ⚠️ | 演示用图形缩放，标注为 6pt |
| `862:592` | Radius/2（圆角4 演示） | 16 ⚠️ | 演示用图形缩放，标注为 8pt |
| `862:600` | Radius/2（圆角5 演示） | 24 | `radius_xl`（@ 24pt 档位） |
| `862:601` | Radius/2（圆角6 演示） | 40 ⚠️ | 演示用图形缩放，标注为 24pt |
| `862:813` | 按钮/28 | 4 | `radius_sm` ✓ |
| `862:787` | 商卡列表 | 12 | `radius_xl` ✓ |
| `862:786` | 搜索框 | 40 | ≈`radius_pill`（2x 渲染） |

> ⚠️ 演示图形以约 2× 尺寸绘制用于视觉展示，API 返回的 `cornerRadius` 为渲染像素值。**以文本标注 pt 值为规范基准。**

---

## 应用场景与语义角色 (Role 层)

> 数据来源：节点 `862:630` 应用示意段落中的语义分组文字。

### 框架 / 模块级（大容器）

| 语义 Token | Atom | 适用组件 |
|:---|:---|:---|
| `radius.module.nav_tag` | `radius_md` (6 pt) | 导航 Tab 指示条、选中态标签 |
| `radius.module.card_standard` | `radius_lg` (8 pt) | 标准内容卡片、列表容器 |
| `radius.module.card_large` | `radius_xl` (12 pt) | 大卡片、通栏弹层、Toast |
| `radius.module.dialog` | `radius_xl` (12 pt) | 逛赚任务弹层、运营活动弹窗 |
| `radius.module.pill_action` | `radius_pill` (24 pt) | 顶部分类 Tab、搜索胶囊、胶囊按钮 |

### 组件级（按钮 / 标签）

| 语义 Token | Atom | 适用组件 |
|:---|:---|:---|
| `radius.btn.xs` | `radius_sm` (4 pt) | 高度 28 / 32 / 36 pt 的功能按钮、列表类目 |
| `radius.btn.lg` | `radius_pill` (24 pt) | 高度 40 / 48 pt 的主行动按钮、搜索框 |
| `radius.tag.sm` | `radius_sm` (4 pt) | 小型功能标签 |
| `radius.tag.pill` | `radius_xl` (12 pt) | 24 pt 高分类 Tag、Toast 气泡 |
| `radius.avatar` | `radius_max` (50%) | 用户头像、圆形操作按钮 |
| `radius.input` | `radius_lg` (8 pt) | 输入框、文本框 |
| `radius.badge` | `radius_max` (50%) | 角标 Badge（数字气泡） |

### 特殊场景

| 场景 | 规则 |
|:---|:---|
| 侧滑小窗头像 | `radius_xs` (2 pt)，轻微圆角强调边框裁切感 |
| 直播/资源入口标签 | `radius_xs` (2 pt)，保持信息密度 |
| 进度条轨道 | `radius_sharp` (0 pt) 或 `radius_xs` (2 pt)，根据高度确定 |
| 全屏底部 Sheet | `topLeft` + `topRight` = `radius_xl` (12 pt)；`bottomLeft` + `bottomRight` = 0 |

---

## 反例与使用警示 (Anti-patterns)

| ❌ 反面用法 | 解释 |
|:---|:---|
| `border-radius: 5px` / `border-radius: 10px` | 裸数字不属于 7 阶体系，禁止使用 |
| `border-radius: 3px` / `border-radius: 7px` | 插值值，破坏离散体系的可预测性 |
| 将 `radius_max` 的 999pt 用于非圆形元素 | 大圆角只适合正方形宿主元素，矩形容器禁用 |
| 弹窗容器四角统一 `radius_pill` | 胶囊圆角用于弹窗会破坏界面层级感知 |
| 不同四角混用多个档位（除 Bottom Sheet 外） | 非标准分角场景须经设计确认，不可随意混用 |

---

## 异常记录与待办事项 (TODOs)

| 编号 | 类型 | 描述 |
|:---|:---|:---|
| R-01 | ⚠️ 命名缺失 | 7 阶体系仅有数值，设计稿未提供正式 Token 命名（如 `radius.sm` 等）；本文档命名为提案，待设计系统统一确认。 |
| R-02 | ⚠️ 演示图缩放 | 演示节点的 `cornerRadius` API 值为 2x 渲染尺寸，与标注 pt 值不一致（如圆角2标注 4pt，形状 cornerRadius=10）；建议设计修正演示图为 1:1 比例。 |
| R-03 | TODO | `radius_max` 场景（头像）在部分实例中使用固定像素值（如 `52`、`100`），建议统一改为 `50%`，兼容多尺寸头像。 |
| R-04 | TODO | Dark Mode 下圆角是否有差异？当前设计稿未区分双模式圆角规范，待确认。 |
| R-05 | TODO | Border（边框/描边）规范（0.5pt / 1pt / 2pt）是否需要独立 Token 管理？当前合并在 `862:534` 同一页面，建议拆分。 |
