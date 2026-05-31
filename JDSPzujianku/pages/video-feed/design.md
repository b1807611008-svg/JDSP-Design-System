---
page_name: VideoFeedPage
page_name_zh: 视频信息流页面
slug: video-feed
layer: Page / Scene Composition Layer
version: "1.0.0"
status: draft
last_updated: "2026-05-25"
guideline_version: "16.0"
relay_source:
  file_id: "1958051135088508929"
  page_id: "291:5329"
  scope_node: "2075:224"
  reference_nodes:
    page_application: "513:2089"
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=291%3A5329&node_id=2075%3A224"
composition:
  components:
    - ../../horizontal/components/video-top-tab/design.md
    - ../../horizontal/components/info-layer/design.md
    - ../../horizontal/components/InteractiveArea2/design.md
    - ../../horizontal/components/bottom-tab/design.md
  visual:
    - ../../foundations/visual/Avatar.md
    - ../../foundations/visual/Icon.md
  tokens:
    - ../../foundations/tokens/color.md
    - ../../foundations/tokens/spacing.md
    - ../../foundations/tokens/typography.md
    - ../../foundations/tokens/radius.md
    - ../../foundations/tokens/shadow.md
    - ../../foundations/tokens/BottomSheet.md
---

# Video Feed Page — 视频信息流页面

## 1. Overview

**Video Feed Page** 是视频沉浸式信息流页面，用于承载短视频播放、频道切换、视频信息展示、右侧互动操作与底部评论输入。

页面职责：

- 组织既有 `horizontal/components/*` 组件，形成完整视频消费页面。
- 承载视频内容区域，并将导航、信息、互动和评论输入以 overlay 方式叠加在视频内容上。
- 协调播放、滑动、评论、键盘、BottomSheet 与沉浸态之间的页面状态。
- 保持 Page → Components → Visual Atoms → Tokens 的依赖链路，不创建新的视觉基础能力。

页面目标：

- 保证视频内容为页面主层，减少 UI 对内容消费的干扰。
- 在沉浸场景中维持顶部频道、左下信息、右侧互动、底部评论入口的稳定可达。
- 在键盘、评论、暂停、全屏等状态下保持组件层级和交互优先级清晰。

场景归属：

- 属于 **Page / Scene Composition Layer**。
- 面向视频沉浸流、短视频详情页、视频推荐流等内容消费场景。

与普通 Feed 页面区别：

| Page Type | Primary Content | Interaction Model | Layout Model |
|:---|:---|:---|:---|
| 普通 Feed 页面 | 多条内容卡片列表 | 卡片级浏览、点击进入详情 | 文档流 / 列表流 |
| Video Feed Page | 单条全屏视频内容 | 上下滑切视频、叠加互动、沉浸播放 | immersive overlay video feed layout |

## 2. Page Composition

```text
VideoFeedPage
├── video-top-tab
├── info-layer
├── InteractiveArea2
├── bottom-tab
└── SystemSafeArea
```

| Node | Page Responsibility |
|:---|:---|
| `video-top-tab` | 页面顶部频道切换、频道导航、搜索 / 菜单入口；在沉浸视频上方 overlay 展示。 |
| `info-layer` | 左下信息展示，包括昵称、视频标题/文案、商品信息、视频切片等内容。 |
| `InteractiveArea2` | 右侧点赞、评论、种草、分享、头像关注、音量控制等互动操作。 |
| `bottom-tab` | 底部 BottomBar 组件族：Type A 评论输入入口，或 Type B 与当前视频内容匹配的复合通条（单条优先）。 |
| `SystemSafeArea` | 页面级系统安全区处理，包括顶部状态栏、底部 Home Indicator、键盘避让。 |

说明：

- `Video Content` 是页面内容层，不作为 Design System 组件新增。
- Page 层只声明组合、位置、状态联动和优先级，不修改组件内部结构。
- `SystemSafeArea` 是页面运行环境约束，不是新增视觉组件。

## 3. Layout Structure

| Component | Position | Layout Behavior |
|:---|:---|:---|
| `video-top-tab` | `top-fixed` | immersive overlay |
| `info-layer` | `bottom-left` | overlay / adaptive height |
| `InteractiveArea2` | `right-center` | fixed overlay |
| `bottom-tab` | `bottom-fixed` | keyboard-aware |
| `SystemSafeArea` | page boundary | safe-area |

### Page Layout Rules

| Behavior | Rule |
|:---|:---|
| overlay | 页面组件叠加在视频内容层之上；组件自身视觉由各自 component docs 决定。 |
| immersive | 视频内容为 base layer，顶部、右侧、左下、底部控件使用沉浸态文本、图标、阴影与半透明背景能力。 |
| fixed | `video-top-tab`、`InteractiveArea2`、`bottom-tab` 在当前视频帧中保持固定锚点，不跟随信息内容滚动。 |
| adaptive | `info-layer` 根据视频文案、标签、商品、切片等内容选择既有变体，高度自适应但不越权定义新尺寸。 |
| keyboard-aware | 键盘可见时，`bottom-tab` 与评论输入状态联动；页面负责避让与 BottomSheet 协调。 |
| safe-area | 顶部状态栏、底部 Home Indicator、键盘区域由 `SystemSafeArea` 统一约束，组件不直接处理系统边界。 |

## 4. Component Dependencies

页面只能引用现有 `horizontal/components/*`，不新增组件。

| Component | Responsibility |
|:---|:---|
| `video-top-tab` | 视频频道切换、顶部沉浸导航、菜单 / 搜索入口。 |
| `info-layer` | 视频标题、昵称、描述文案、商品信息、视频切片定位等左下内容展示。 |
| `InteractiveArea2` | 头像关注、点赞、评论、种草、分享、音量控制等右侧操作区。 |
| `bottom-tab` | 评论输入入口、表情入口与键盘触发；当视频挂载内容通条时切换为 Type B 单条整行通条。 |

Dependency contract：

- Page 调用组件公开的组合能力与状态参数。
- Page 不重写组件 token。
- Page 不进入组件内部子树修改 slot 顺序。
- Page 不创建任何虚构抽象层。

## 5. Visual Dependencies

| Visual Atom | Usage |
|:---|:---|
| `Avatar` | `InteractiveArea2` 中作者头像、直播 / 关注状态的头像基础能力。 |
| `Icon` | `video-top-tab` 菜单 / 搜索图标，`InteractiveArea2` 点赞 / 评论 / 种草 / 分享 / 音量图标，`bottom-tab` 评论 / 表情图标，`info-layer` 标签 / 商品 / 切片图标。 |

规则：

- Page 层只通过组件间接消费 Visual Atoms。
- Page 不新增 Icon、Avatar 或其它 Atom。
- Page 不在页面层重绘图标路径。

## 6. Token Dependencies

页面只能引用已有 token 文件，不新增 token，不直接写 raw value。

| Token File | Usage |
|:---|:---|
| `color.md` | 沉浸态文本、图标、半透明背景、蒙层、品牌主色、状态色。 |
| `spacing.md` | 页面安全区、组件之间的页面级避让关系、组件内部间距的来源约束。 |
| `typography.md` | 视频标题、昵称、频道 Tab、评论输入提示、互动计数等文字体系。 |
| `radius.md` | 评论输入栏、信息卡片、标签、音量胶囊等圆角体系。 |
| `shadow.md` | 视频背景上文字与图标的防穿透阴影。 |
| `BottomSheet.md` | 评论面板、分享面板、更多频道等底部弹层联动规则。 |

Token usage rules：

- Page 层只声明 token 文件依赖，不定义具体 token 终值。
- 组件内 token 映射以各组件文档为准。
- 若页面级避让、层级或动效缺少 token，只记录 TODO，不在 Page 文档中补 raw value。

## 7. Layer Priority

| Component | Priority |
|:---|:---|
| `bottom-tab` | highest |
| `video-top-tab` | high |
| `InteractiveArea2` | high |
| `info-layer` | medium |
| `Video Content` | base |

Priority rules：

- `Video Content` 是 base layer，所有 UI overlay 均在其上。
- `bottom-tab` 在评论输入、键盘、BottomSheet 触发链路中拥有最高交互优先级。
- `video-top-tab` 与 `InteractiveArea2` 同属高优先级操作入口，互不覆盖。
- `info-layer` 允许根据评论、键盘或 BottomSheet 状态让出空间。

## 8. Page States

页面状态：

```text
idle
playing
paused
commenting
immersive
keyboard-visible
full-screen
```

| State | Affected Component | Rule |
|:---|:---|:---|
| `idle` | all | 初始页面结构已挂载，视频内容未进入强播放反馈。 |
| `playing` | `info-layer` / `InteractiveArea2` / `bottom-tab` | 保持沉浸 overlay 展示，不阻断视频内容。 |
| `paused` | `InteractiveArea2` / `info-layer` | 互动区仍可点击；页面可保留信息层可读性。 |
| `commenting` | `bottom-tab` / `info-layer` / BottomSheet | 底部评论入口触发评论输入或评论面板，信息层根据空间进行避让。 |
| `immersive` | `video-top-tab` / `InteractiveArea2` / `info-layer` | 顶部、右侧、左下内容以沉浸态视觉叠加在视频上。 |
| `keyboard-visible` | `bottom-tab` / `info-layer` / BottomSheet | 底部输入区键盘避让；信息层避免与键盘和输入区冲突。 |
| `full-screen` | `video-top-tab` / `bottom-tab` / `InteractiveArea2` | 页面可收敛非必要 overlay，但不得修改组件内部结构。 |

State ownership：

- 播放状态由页面播放器或业务状态机拥有。
- 评论和键盘状态由页面输入链路拥有。
- 组件只接收状态或回调，不在内部建立页面级状态真相。

## 9. Interaction Rules

### 9.1 页面滑动

- 上下滑动切换视频内容。
- 滑动切换时，Page 负责重置或同步当前视频的 `info-layer`、`InteractiveArea2` 与 `bottom-tab` 数据。
- 组件内部视觉与尺寸不因滑动手势被 Page 改写。

### 9.2 视频切换

- 切换视频后，`info-layer` 更新当前视频标题、昵称、商品、切片等内容。
- `InteractiveArea2` 更新点赞、评论、种草、分享、头像关注和音量状态。
- `bottom-tab` 由 Page 根据当前视频 payload **挂载 BottomBar 形态**：
  - 无内容通条时：展示 **Type A** 评论输入态（`data-bottom-mode="comment"`）。
  - 有内容通条时：展示 **Type B** 单条整行通条（`data-bottom-mode="strip"`），通条类型与文案由视频内容 / 运营策略决定，同一时刻仅展示一条。
- Type B 通条结构遵循 `horizontal/components/bottom-tab/design.md`：leading icon + label + sep + content + assist + arrow；尺寸参照 Relay `1188:1924`（353×34，top=14）。
- `index.html` Demo 映射示例：
  - 视频 1：Type A 评论入口
  - 视频 2（@京东家电）：Type B · 相关搜索 · 新风空调怎么选
  - 视频 3（@趋势好物局）：Type B · 话题 · 春夏通勤穿搭
- 页面应用态参考 Relay [`513:2089`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=291%3A5329&node_id=513%3A2089)。

### 9.3 顶部 tab 联动

- `video-top-tab` 负责视频频道切换。
- 频道变化后，页面刷新视频流数据源，并同步当前 feed 的播放状态。
- Page 不新增顶部导航结构，也不绕过 `video-top-tab` 直接绘制频道 Tab。

### 9.4 评论输入

- 仅在 **Type A** 评论输入态下，点击 `bottom-tab` 进入 `commenting`。
- Type B 通条态下，点击通条进入对应内容 / 聚合页；不得与 Type A 评论入口同时堆叠展示。
- Page 可打开评论 BottomSheet 或激活输入态。
- 评论提交、表情入口、输入校验由业务输入链路处理；`bottom-tab` 只作为入口组件。

### 9.5 键盘弹起

- 进入 `keyboard-visible` 后，`bottom-tab` 进入 keyboard-aware 布局。
- `info-layer` 必须避让键盘与评论输入区，不覆盖输入主路径。
- Page 不用 raw value 定义键盘偏移；缺失的页面级避让 token 记录为 TODO。

### 9.6 BottomSheet 联动

- 评论面板、分享面板、更多频道等 BottomSheet 使用已有 `BottomSheet.md` token/规则。
- BottomSheet 打开时，页面应协调 `bottom-tab`、`info-layer` 与手势区域。
- Page 不创建新的 Sheet 视觉规范。

### 9.7 手势冲突

- 上下滑视频手势优先作用于视频 feed。
- 右侧 `InteractiveArea2` 点击操作不得触发视频切换。
- `info-layer` 中展开文案、商品卡、切片横滑等局部交互由组件规则处理，Page 只负责冲突调度。
- BottomSheet 打开后，面板拖拽优先级高于视频切换手势。

### 9.8 沉浸态切换

- `immersive` 状态下，`video-top-tab`、`info-layer`、`InteractiveArea2`、`bottom-tab` 均叠加在视频上。
- `full-screen` 或强沉浸场景可收敛非必要入口，但不得删除组件定义或新建替代组件。
- 退出沉浸态时恢复组件的页面锚点与数据状态。

## 10. Donts

- 不在页面层新增 spacing。
- 不在页面层覆盖组件 token。
- 不在页面层修改组件内部结构。
- 不在页面层直接定义颜色。
- 不在页面层创建新 atom。
- 不在页面层新增 Icon / Avatar / Button 等基础视觉能力。
- 不绕过 existing component system 自绘 `video-top-tab`、`info-layer`、`InteractiveArea2` 或 `bottom-tab`。
- 不创建页面规范中不存在的抽象结构。
- 不把视频内容层包装成新的 Design System 组件。
- 不用 raw value 写页面级位置、间距、颜色、圆角、阴影或动效。

## TODO

| ID | Type | Description |
|:---|:---|:---|
| VFP-TODO-01 | token | 页面级 z-index / priority token 尚未沉淀；当前只记录 priority 语义，不写 raw value。 |
| VFP-TODO-02 | token | keyboard-visible 状态下的页面级避让 token 需由 spacing / layout 体系补齐。 |
| VFP-TODO-03 | motion | 视频切换、暂停、沉浸态收敛与 BottomSheet 联动的 motion token 需补齐。 |
| VFP-TODO-04 | state | 评论 BottomSheet 与输入键盘的状态机边界需在页面交互规范中继续细化。 |
| VFP-TODO-05 | verification | 后续如需像素级校验，应基于 Relay `2075:224` 截图与组件现有 spec-page 进行比对。 |
