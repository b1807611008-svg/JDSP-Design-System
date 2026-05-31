---
file: behaviors
component_name: InteractiveArea
slug: interactive-area
version: "1.0.0"
last_updated: "2026-05-25"
---

# InteractiveArea · Behaviors

## 0. Demo 切换（建议 spec-page.html 对齐）

| 控件 | 属性 | 取值 | 行为 |
|:---|:---|:---|:---|
| 组合变体 | `data-ia-variant` | `without_grass` / `with_grass` | 切换是否渲染 grass 操作项。 |
| 头像直播 | `data-avatar-live` | `not_live` / `live` | 切换直播标签、直播环和头像状态层。 |
| 关注关系 | `data-avatar-relationship` | `unfollowed` / `intermediate` / `followed` | 切换关注按钮展示。 |
| 操作状态 | `data-action-state` | `default` / `active` / `disabled` | 切换 like / grass 的激活反馈。 |
| 音量状态 | `data-volume-state` | `muted` / `unmute_prompt` | 切换音量控制 UI。 |

### 0.1 Demo 必测路径

| Path | Initial | Trigger | Expected |
|:---|:---|:---|:---|
| 未关注 → 中间态 | `avatar.relationship=unfollowed` | 点击关注 badge | 进入 `intermediate`；关注请求 pending 期间不重复触发。 |
| 中间态 → 已关注 | `avatar.relationship=intermediate` | 业务成功回调 | 进入 `followed`；隐藏关注 badge。 |
| 非直播 → 直播中 | `avatar.liveState=not_live` | 业务直播状态变更 | 展示 live badge + outer ring；关系状态保持不变。 |
| 无种草 → 有种草 | `variant=without_grass` | grass payload 存在 | 在 comment 与 share 之间插入 grass，不改变其它 slot 顺序。 |
| 点赞 default → active | `like.isActive=false` | 点击 like | 图标和计数切换到 primary red；输出 `onActionTap(type=like)`。 |
| 种草 default → active | `grass.isActive=false` | 点击 grass | 图标和计数切换到 recommend green；输出 `onActionTap(type=grass)`。 |

## 1. 状态机边界

| State Domain | Owner | InteractiveArea2 Rule |
|:---|:---|:---|
| composition | InteractiveArea2 | 只决定 `without_grass` / `with_grass` 与 slot 顺序。 |
| avatar | InteractiveAvatar | 透传 `liveState` 与 `relationship`，不改写头像内部状态层。 |
| action | InteractiveActionItem | 透传 `type`、`isActive`、`disabled`、`count`，不重绘图标或计数文字。 |
| volume | InteractiveVolumeControl | 透传 `state`，不把音量按钮当作普通 ActionItem。 |
| page layout | Page | 负责右侧定位、安全区避让、z-index 与播放器状态。 |

组合层可以聚合事件，但不得建立与子组件或播放器并行的第二套状态真相。

## 2. 点击头像

| Trigger | Behavior |
|:---|:---|
| Tap avatar image | 打开作者主页或资料层，由页面路由决定。 |
| Tap live badge / live avatar | 若作者直播中，可进入直播间；否则保持头像默认跳转。 |
| Tap followed avatar | 不展示关注按钮，但头像仍可进入作者主页。 |

## 3. 关注关系

- `unfollowed` 点击后进入 `intermediate`，等待业务确认。
- `intermediate` 不重复触发关注请求；可根据业务结果进入 `followed` 或回退 `unfollowed`。
- `followed` 不展示关注 badge；取消关注不在 InteractiveArea 默认路径中提供。
- 关注按钮定位与图形完全由 `InteractiveAvatar.md` 控制。

## 4. 互动操作

| Trigger | Behavior |
|:---|:---|
| Tap like default | 切换至 active，更新计数，并触发 `onActionTap(type=like)`。 |
| Tap like active | 是否取消点赞由业务声明；组件只输出事件，不自行写业务状态。 |
| Tap comment | 打开评论面板或跳转评论锚点。 |
| Tap grass default | 切换至 active，更新计数，并触发种草事件。 |
| Tap share | 打开分享面板。 |
| Tap disabled item | 不触发业务事件，不变更视觉状态。 |

## 5. 音量控制

- `muted` 默认展示 50×50 hotzone 内的圆形静音按钮。
- 当业务需要提示用户恢复声音时，切换为 `unmute_prompt` 胶囊态。
- 点击 `muted` 或 `unmute_prompt` 均输出 `onVolumeToggle`；实际音频状态由页面播放器管理。
- 音量控制不参与普通 ActionItem 的计数、激活色和排列高度规则。

## 6. 垂直布局

- InteractiveArea 必须保持 column 排列。
- 子项顺序严格遵循 Relay：avatar → like → comment → optional grass → share → volume。
- `without_grass` 不保留空位；总高度自然减少一个 ActionItem。
- 子项之间不在组合层添加额外 gap；只消费 `space.action_item_stack_gap`。
- 页面右侧定位、底部安全区避让和 z-index 由页面布局层处理。

## 7. 数据联动

- 计数展示由业务输入决定，组件不负责格式化大数以外的业务逻辑。
- 服务端返回失败时，应回滚对应子项状态，但不改变其它子项。
- `with_grass` 如果缺失 grass 数据，必须降级到 `without_grass`。
- 音量状态与播放器状态保持单源同步，不允许组件内部自建第二套音量 truth。

## 8. 可访问性

- 整个 InteractiveArea 可声明为 `role="group"`，并提供描述性 label。
- 每个 ActionItem 必须有可访问名称，例如「点赞」「评论」「种草」「转发」。
- 计数变化应避免高频 aria-live 打扰；只在业务确认需要时暴露。
- 音量按钮必须明确当前状态与下一步动作，例如「当前静音，点击取消静音」。

## Donts

| Dont | Reason |
|:---|:---|
| 不在组合层写裸 CSS 数值 | InteractiveArea 只能引用子组件与 token。 |
| 不重绘头像 / 图标 / 直播标签 | 这些视觉细节由 InteractiveAvatar / InteractiveActionItem 单源维护。 |
| 不给 without_grass 留空位 | 空位会破坏 Relay 组合节奏。 |
| 不把 volume 当普通 action item | 音量控制有独立 hotzone、圆形 / 胶囊状态和偏移变量。 |
| 不把 Relay 外层画布坐标当布局 token | 页面定位应由业务布局层负责。 |
| 不在 disabled 状态触发事件 | 禁用态必须保持无副作用。 |
