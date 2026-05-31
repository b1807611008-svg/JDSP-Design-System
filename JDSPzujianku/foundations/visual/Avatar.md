---
component_name: Avatar
component_cn_name: 头像
category: Atom
version: 16.0-draft
last_updated: 2026-05-24
relay_source:
  file_id: "1958051135088508929"
  page_id: "862:3713"
  node_id: "862:3742"
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=862%3A3713&node_id=862%3A3742"
extraction_status:
  source: Relay MCP get_design_context + get_screenshot
  sizes: 6 / 6
  fallback: extracted from "02 兜底"
---

# Avatar 头像

## 组件概述 (Overview)

Avatar 是用于展示用户或实体身份的基础视觉组件，属于 Atom 层。组件主体必须以正方形容器承载图片或兜底图形，并强制裁切为正圆形，不允许出现圆角矩形、椭圆或未裁切的原始图片。

头像图片应以容器中心裁切，保证视觉主体居中；当图片比例非 1:1 时，仍以圆形容器为最终可见边界。

## 尺寸阶梯 (Size Variants)

| Token / 尺寸别名 | 像素值 (px) | 使用场景 | 使用警示 |
|---|---:|---|---|
| `avatar.size-76` / `xl` | 76 | 个人页主头像 | 仅用于高优先级身份展示，不得替换为常规 48px 等未在设计稿中出现的尺寸。 |
| `avatar.size-42` / `lg` | 42 | 短视频互动区、看赚排行榜像头 | 适用于互动区和榜单头像；落地时需保持正圆裁切和边界清晰。 |
| `avatar.size-36` / `md` | 36 | 评论区、看赚邀请头像 | 作为评论与邀请场景的主要头像尺寸，不得向 32px 自动降级。 |
| `avatar.size-32` / `sm` | 32 | 问答一级信息头像 | 用于一级信息列表；需保证与文本行高、信息密度匹配。 |
| `avatar.size-20` / `xs` | 20 | 问答& 评论区二级信息头像 | 小尺寸下图片细节可读性有限，应避免承载复杂身份识别信息。 |
| `avatar.size-16` / `xxs` | 16 | 双列图文视图下作者头像（较小慎用） | 较小慎用；仅用于双列图文视图下的作者露出，不应用于需要明确识别用户身份的主流程。 |

## 兜底与空状态 (Fallback States)

当用户未上传头像、头像 URL 为空、图片加载失败或图片资源被安全策略拦截时，Avatar 必须展示兜底态，不允许显示破图图标、空白圆形或未裁切的默认浏览器占位。

Relay 节点「02 兜底」模块明确展示了通用人像占位图，并给出 36px 与 20px 两种兜底示例尺寸。设计稿未标注默认性别占位图，因此本文档不新增性别态；如业务需要性别占位，应作为 Avatar 的业务扩展另行定义。

| 兜底类型 | Relay 源值 | Token 引用 | 使用规则 |
|---|---|---|---|
| 浅色通用人像占位 | 底色 `#EAEAEA`，Icon `white` | 底色：`avatar_fallback_bg_light`（待补充到 token registry，源值 `#EAEAEA`）；Icon：`white` | 默认兜底态，适用于浅色页面或内容容器。 |
| 深色通用人像占位 | 底色 `#828794`，Icon `#F2F3F7` | 底色：`gray_3`；Icon：`gray_5` | 适用于需要更强占位对比的场景，或浅色占位在背景中识别度不足时。 |

兜底图形必须随 Avatar 尺寸等比缩放，保持人像图形在圆形容器内居中。36px 与 20px 已在设计稿中出现，其他尺寸使用同一兜底图形的等比适配，不新增额外造型。

## Token 映射规则 (Token Mapping)

### 尺寸

尺寸必须使用 Avatar 专属尺寸别名映射到底层 size token 或组件变量，不得临时写入 48px、24px 等未在设计稿中出现的常规头像尺寸。

| Avatar token | Value |
|---|---:|
| `avatar.size-76` | 76px |
| `avatar.size-42` | 42px |
| `avatar.size-36` | 36px |
| `avatar.size-32` | 32px |
| `avatar.size-20` | 20px |
| `avatar.size-16` | 16px |

### 圆角

所有 Avatar 必须使用圆形裁切。设计实现应优先引用 `radius.full` 或系统中对应的最大圆角 / 圆形形状 token；若 V16 token registry 暂未恢复 `radius.full`，工程实现必须以组件语义 token `avatar.radius = circle` 承接，并在样式层等价实现为 `border-radius: 50%`。

Avatar 不参与普通组件按高度推导圆角的规则，不得将 16px、20px、32px、36px、42px、76px 头像映射为 `radius_s`、`radius_base` 或 `radius_l`。

### 边框

设计稿中的图片头像示例存在白色内描边：76px 与 42px 使用 2px white 内描边，36px 与 32px 使用 1px white 内描边，20px 与 16px 使用 0.5px white 内描边。该描边用于复杂图片边界与背景分离，不改变 Avatar 的实际尺寸。

在复杂背景下，如深色背景、沉浸式视频流、短视频互动区等，Avatar 应添加内描边或半透明描边以保证可读性：

| 场景 | Token / 规则 |
|---|---|
| 浅色或普通内容背景 | 可不加边框；如图片边缘与背景粘连，使用 `white` 内描边。 |
| 深色 / 视频流 / 沉浸式背景 | 使用 `white` 内描边或 `color_border` 的半透明线色，优先保证头像边界可识别。 |
| 兜底占位图 | 不额外添加外边框，保持兜底圆形底色和 Icon 对比。 |

描边必须以内描边方式实现，避免增加组件外部占位尺寸；如平台不支持内描边，应通过等效的 inset shadow 或 overlay 实现。
