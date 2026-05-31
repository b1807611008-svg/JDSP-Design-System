# Icon 图标

**规范唯一来源（强制）**：仅允许以 JDSP 规范稿 **fileKey `1958051135088508929`** 中页面 **「1.3 icon图标 🟢」**（`page_id=146:39`）为图标规范入口；锚点节点 **`1487:10277`**。  
**规范链接**：[relay.jd.com — 1.3 icon，node 1487:10277](https://relay.jd.com/file/design?id=1958051135088508929&page_id=146%3A39&node_id=1487%3A10277)  
**禁止**：引用其他任何 Relay 设计稿中的图标组件集或图标页面作为规范；业务稿内自建 ICON 集不得替代上述入口。

下文中的历史 nodeId 仅作文档内交叉引用说明；**MCP / 改稿 / 选型** 时一律以上述锚点所在 JDSP 页面为准。

**Zero nodeId（规范来源）**:  
- `1719:3234` (视频-线) — 线图图标库  
- `1719:4170` (视频-面) — 面图图标库  
**Guideline**: JD APP 15.0

> **v2 变更说明（设计库更新）**：  
> - 新增独立 **面图（-fill）** 分区，线/面完全分离，不再混用节点  
> - 已移除：`icon-minus`、`icon-question`、`icon-like-hand`、`icon-commodity-dislike`（线图库中已删除）  
> - 节点修正：原 `icon-play`（`1737:226`）、`icon-clock`（`1737:228`）、`icon-gift`（`1847:2365`）均归属面图库，命名更新为对应 `-fill` 版本

## 1. 设计理念（Design Principles）

- **统一语义优先**：图标先表达动作语义，再承载风格差异；同一语义在不同业务页保持形态一致，仅在尺寸与色值上做上下文适配。  
- **15.0 主流程一致性**：在 `视频详情 / 逛双列 / 评论区 / 搜索结果 / 短剧` 等主流程中，统一使用 `48` 母版网格与同一命名族，降低跨场景识别成本。  
- **情感层级控制**：高唤起动作（点赞、关注、告警）通过状态色和强对比强化反馈；中性动作（搜索、转发、评论）保持低情绪噪声，避免干扰内容消费。  
- **单色继承策略**：默认图标资产按单色规范收口，业务态通过 `currentColor` 驱动（默认/激活/禁用），确保主题化与状态切换一致。

## 2. 栅格规范（Grid Specs）

| 场景 | 母版网格 | 输出尺寸 | 点击热区 | 备注 |
|------|----------|----------|----------|------|
| 标准图标库（15.0） | `48 × 48` | `20 / 24 / 32 / 48` | 由容器定义 | 统一源于 `1.3 icon图标` 页 |
| 大尺寸展示 | `48 × 48` | `48` | 常见 `48 × 48` | 详情头部/强调动作位 |
| 中大尺寸展示 | `48 × 48` 等比缩放 | `32` | 常见 `32 × 32` | 二级操作区、辅助功能位 |
| 互动区专属 | **`50 × 50`（含透明热区 padding）** | **`50`（不可缩减）** | **自带 `50 × 50` 透明 padding** | `node 1808:654` 实测；内部实际图形约 `27pt`，四周留空为热区 |

> ⚠️ **互动区图标特殊说明（重要）**：
> - 互动区图标画板固定为 **`50 × 50pt`**，内部核心图形约 **`27pt`**，四周为透明热区 padding（设计有意保留，不可裁剪）。
> - **禁止对互动区图标使用常规字号级尺寸（如 `24px / 36px`）**，等比缩小后内部 27pt 图形会显得极其微小，视觉失衡。
> - 正确做法：**保持容器 `50 × 50px`（`size="interactive"`）**，由透明 padding 自行承担热区功能，无需额外处理。

## 3. 笔触规范（Stroke Rules）

| 规则项 | 参数 | 适用范围 |
|--------|------|----------|
| 默认线宽 | `3dp` (`icon.strokeWidth.default`) | 常规线图图标 |
| 提示增强线宽 | `4dp` (`icon.strokeWidth.hint`) | 告警/提示类图标 |
| 48 尺寸笔触（补全 TODO） | `3dp` 主笔触 | 48 输出主流程 |
| 32 尺寸笔触（补全 TODO） | `2dp` 等比降阶 | 32 输出位，保证清晰度 |

## 4. 圆角与转折（Corner Radius）

- Outer corner: `8dp` → `radius.lg`
- Detail large: `6dp` → `radius.md`
- Detail small: `4dp` → `radius.sm`
- Sharp corner (< 90°): `1.5dp` → `radius.sharp`
- Endpoint: `0.5dp` → `radius.endpoint`

## 5. 变体体系（Variants）

| Variant | Description | Frame nodeId |
|---------|-------------|--------------|
| 线 (line) | Outline / stroke style | `1719:3234` |
| 面 (filled) | Solid / filled style | `1719:4170` |

## 6. 互动区专属绘制参数（Immersive Interaction Specs）

- **画板尺寸**：互动区图标画板固定为 **`50 × 50pt`**，内部核心图形约 **`27pt`**，四周透明 padding 为设计有意保留的热区空间，**禁止裁剪 viewBox**。
- **渲染尺寸**：SVG 容器必须设置为 `width: 50px; height: 50px`（对应组件 `size="interactive"`），绝对禁止使用常规字号级尺寸（`xs/sm/md/lg/xl/2xl`）。
- **热区规则**：右侧互动列单项容器 `50×62`，其中图标（含热区）`50×50`，计数区约 `14~15` 高。
- **阴影规范**：互动图标容器统一 `drop-shadow(0px 1px 1px rgba(0,0,0,0.2))`；文字阴影 `0px 1px 1px rgba(0,0,0,0.2)`。
- **状态驱动**：互动图标按单色资产清洗后，通过 `currentColor` 响应业务态颜色（如点赞激活红、种草激活绿）。

### 互动区尺寸配置（size="interactive"）

```tsx
// 组件层新增 size variant
const sizeClass = {
  xs:          'w-3 h-3',      // 12px — 常规图标
  sm:          'w-4 h-4',      // 16px — 常规图标
  md:          'w-5 h-5',      // 20px — 常规图标
  lg:          'w-6 h-6',      // 24px — 常规图标（默认）
  xl:          'w-9 h-9',      // 36px — 常规图标强调位
  '2xl':       'w-12 h-12',    // 48px — 常规图标超大位
  interactive: 'w-[50px] h-[50px]', // 50px — ⚠️ 互动区专用，含透明热区 padding
} as const;
```

> **关键约束**：`size="interactive"` 专属于 `interactive/` 目录下的互动区图标（like/comment/grass/share 等）。常规图标（`line/` 和 `fill/`）禁止使用此 size，会因 viewBox 差异导致视觉异常。

## 7. 图标库分类（Library Structure）

```text
icons/
├── line/          # 视频-线
├── fill/          # 视频-面
├── interactive/   # 互动区专属(点赞 / 评论 / 种草 / 转发)
└── legacy/        # 废弃与历史归档
```

## 核心互动资产映射表（node_id=1808:654）

| 图标名称 | 设计节点 node_id | 适用状态 |
|---------|------------------|----------|
| like | `1808:654;1600:1055` | Default（未赞） |
| like | `633:4222` | Active（已赞） |
| comment | `1808:654;1600:1056` | Default |
| grass | `1808:654;1600:1057` | Default（未种草） |
| grass | `633:4342` | Active（已种草） |
| share | `1808:654;1600:1061` | Default |

> **核心约束声明（强制）**：以上互动图标即使路径层级复杂，也必须执行单色清洗流程；移除资产内固定 `fill` / `stroke` 语义绑定，统一采用 `currentColor` 作为运行时着色入口，由业务状态（Default / Active / Disabled）驱动颜色。

## 互动区音量控制变量（node_id=633:3616）

> 来源：Relay 节点 `633:3616`（互动区-音量）与落位节点 `1791:107`（底部静音图标）；已通过 zero-design MCP `get_design_context` / `get_variables` / `get_screenshot` 校验。  
> 用途：右侧互动区最底部音量控制，支持「静音」圆形按钮与「取消静音」胶囊按钮切换。组件 CSS 只能消费下表变量，禁止在实现层写裸值。

### 音量控制尺寸变量

| Token | 值 | Relay 来源 | 用途 |
|---|---:|---|---|
| `size.interactive_volume_hotzone` | `50px` | `1791:107` | 底部音量按钮热区 |
| `size.interactive_volume_control_w` | `69px` | `633:3614` / `1787:132` | 音量胶囊组件宽度 |
| `size.interactive_volume_control_h` | `30px` | `633:3614` / `1787:132` | 音量胶囊组件高度 |
| `size.interactive_volume_circle` | `30px` | `1787:133` / `1791:108` | 静音圆形按钮视觉底 |
| `size.interactive_volume_icon_compact` | `16px` | `1791:109` | 落位静音图标尺寸 |
| `size.interactive_volume_icon_inline` | `14px` | `633:3579` / `1787:148` | 胶囊内图标尺寸 |
| `space.interactive_volume_circle_inset` | `10px` | `1791:108` | 50 热区内圆形按钮偏移 |
| `space.interactive_volume_icon_compact_inset` | `17px` | `1791:109` | 50 热区内静音图标偏移 |
| `space.interactive_volume_label_x` | `7px` | `633:3578` | 「取消静音」文字左偏移 |
| `space.interactive_volume_label_y` | `9.5px` | `633:3578` | 「取消静音」文字上偏移 |
| `space.interactive_volume_inline_icon_x` | `48px` | `633:3579` | 胶囊内图标左偏移 |
| `space.interactive_volume_inline_icon_y` | `8px` | `633:3579` / `1787:148` | 胶囊内图标上偏移 |
| `space.interactive_volume_compact_circle_x` | `39px` | `1787:133` | 69 组件内静音圆形左偏移 |
| `space.interactive_volume_compact_icon_x` | `47px` | `1787:148` | 69 组件内静音图标左偏移 |
| `space.interactive_volume_reset` | `0` | 工程归一化 | button 默认 padding 清零 |

### 音量控制颜色 / 字体 / 圆角变量

| Token | 值 | Relay 来源 | 用途 |
|---|---:|---|---|
| `color.interactive_volume_bg` | `color/background 3` = `#ffffffe5` | `633:3616` variables | 胶囊底 / 圆形底 |
| `color.interactive_volume_fg` | `color/title` = `#171a26` | `633:3616` variables | 图标与文字前景 |
| `color.interactive_volume_transparent` | `transparent` | 工程归一化 | 静音热区透明背景 |
| `border.interactive_volume_reset` | `none` | 工程归一化 | button 默认边框清零 |
| `opacity.interactive_volume_content` | `0.90` | `633:3578` / `633:3579` | 胶囊文字与图标透明度 |
| `radius.interactive_volume_pill` | `radius_max` | `633:3614` / `1787:132` | 胶囊圆角 |
| `radius.interactive_volume_circle` | `radius_max` | `1787:133` / `1791:108` | 圆形按钮圆角 |
| `font.interactive_volume_label` | `font_size_10_500` | `633:3578` | 胶囊文字 |
| `line_height.interactive_volume_label` | `10.91px` | `633:3578` | 胶囊文字行高 |

### 音量控制资产映射

| 控制状态 | 组件节点 | 图标资产 | 图标节点 | UI 形态 |
|---|---|---|---|---|
| `muted` / 静音 | `1787:132` / `1791:107` | `icon-volume-mute-fill` | `1847:6831` / `1847:6838` | 圆形按钮，仅图标 |
| `unmute_prompt` / 取消静音 | `633:3614` | `icon-volume-mute-fill` | `1787:150;1847:6838` | 胶囊按钮，文字 + 图标 |

> **切换规则**：默认静音状态使用 `muted` 圆形按钮；当需要提示用户恢复声音时切换为 `unmute_prompt` 胶囊按钮，文案固定为「取消静音」。两种状态均使用 `currentColor` 驱动 `icon-volume-mute-fill`，颜色取 `color.interactive_volume_fg`。

---

## Icon Inventory — 视频-线 (Line)

### Navigation
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-arrow-left | `1847:6675` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6675) |
| icon-arrow-right | `1847:6667` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6667) |
| icon-arrow-up | `1847:6651` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6651) |
| icon-arrow-down | `1847:6659` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6659) |
| icon-more | `1719:4648` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1719:4648) |
| icon-more-vertical | `1737:160` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:160) |
| icon-category | `1847:6687` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6687) |

### Actions
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-close | `1719:4570` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1719:4570) |
| icon-add | `1858:61` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1858:61) |
| icon-add-plus | `1737:198` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:198) |
| icon-delete | `1847:6696` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6696) |
| icon-edit | `1847:6705` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6705) |
| icon-copy | `1737:140` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:140) |
| icon-refresh | `1737:206` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:206) |
| icon-share | `1847:6642` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6642) |
| icon-forward | `1737:132` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:132) |
| icon-search | `1737:108` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:108) |
| icon-maximize | `575:635` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=575:635) |
| icon-minimize | `575:638` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=575:638) |

### Social & Engagement
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-like | `1737:136` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:136) |
| icon-heart | `1847:6734` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6734) |
| icon-heart-add | `1847:6726` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6726) |
| icon-heart-broken | `1737:126` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:126) |
| icon-star | `1784:80` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1784:80) |

### Communication
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-message | `1737:4149` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:4149) |
| icon-chat | `1773:920` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1773:920) |
| icon-comment-check | `1737:146` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:146) |
| icon-comment-mute | `1737:144` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:144) |
| icon-bell | `1737:134` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:134) |

### Media
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-volume | `1847:6762` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6762) |
| icon-volume-mute | `1847:6770` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6770) |
| icon-autoplay | `1737:142` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:142) |
| icon-landscape | `1737:170` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:170) |

### Commerce & User
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-cart | `1773:907` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1773:907) |
| icon-user | `1737:202` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:202) |
| icon-location | `1737:204` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:204) |
| icon-grid | `1737:182` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:182) |
| icon-browse | `1737:192` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:192) |
| icon-eye | `1847:6752` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6752) |

### System & Files
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-model | `1737:116` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:116) |
| icon-file | `1737:118` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:118) |
| icon-folder | `1737:122` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:122) |
| icon-block | `1737:120` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:120) |
| icon-bullet | `1737:148` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:148) |

### Status / Emotion
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-warning | `1737:172` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:172) |
| icon-happy | `1737:164` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:164) |
| icon-sad | `1737:128` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:128) |
| icon-smile | `1847:6744` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6744) |

---

## Icon Inventory — 视频-面 (Fill)

### Navigation — Fill
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-arrow-down-fill | `1737:220` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:220) |
| icon-arrow-up-fill | `1737:222` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:222) |
| icon-arrow-right-fill | `1737:224` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:224) |

### Media — Fill
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-play-fill | `1737:226` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:226) |
| icon-clock-fill | `1737:228` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:228) |
| icon-volume-fill | `1847:6822` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6822) |
| icon-volume-mute-fill | `1847:6831` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6831) |

### Social & Engagement — Fill
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-heart-fill | `1847:6840` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6840) |
| icon-star-fill | `1847:6868` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:6868) |
| icon-like-fill | `1719:5886` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1719:5886) |
| icon-follow-added-fill | `1922:200` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1922:200) |

### Actions — Fill
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-copy-fill | `1737:230` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1737:230) |
| icon-check-fill | `1719:3234` | [→](https://relay.jd.com/file/design?id=1958051135088508929&page_id=146%3A39&node_id=1719%3A3234) |

### Commerce — Fill
| Name | nodeId | Zero Link |
|------|--------|-----------|
| icon-gift-fill | `1847:2365` | [→](https://relay.jd.com/file/design?id=1958051135088508929&node_id=1847:2365) |
| icon-cart-fill | `1719:4170` | [→](https://relay.jd.com/file/design?id=1958051135088508929&page_id=146%3A39&PAGE_LOAD_MODE=1&node_id=1719%3A4170) |

---

## React + Tailwind Implementation

```tsx
import { FC } from 'react';

// Icon size map → Tailwind classes (using TOKENS.json icon.sizes)
const sizeClass = {
  xs: 'w-3 h-3',    // 12px
  sm: 'w-4 h-4',    // 16px
  md: 'w-5 h-5',    // 20px
  lg: 'w-6 h-6',    // 24px
  xl: 'w-9 h-9',    // 36px
  '2xl': 'w-12 h-12', // 48px
} as const;

type IconSize = keyof typeof sizeClass;

interface IconProps {
  name: string;           // e.g. "icon-arrow-left" | "icon-heart-fill"
  size?: IconSize;
  className?: string;
  color?: string;         // Tailwind text color class
}

export const Icon: FC<IconProps> = ({
  name,
  size = 'lg',
  className = '',
  color = 'text-[#171A26]',
}) => (
  <svg
    className={`${sizeClass[size]} ${color} ${className}`}
    aria-label={name}
  >
    <use href={`/icons/sprite.svg#${name}`} />
  </svg>
);
```

## Tailwind Token Mapping

| Token | Tailwind Class |
|-------|---------------|
| `color.icon.default` | `text-[#171A26]` or `fill-[#171A26]` |
| `color.icon.brand` | `text-[#FF0F23]` |
| `color.icon.muted` | `text-[#666666]` |
| `color.icon.inverse` | `text-white` |
| `icon.sizes.sm` | `w-4 h-4` |
| `icon.sizes.lg` | `w-6 h-6` |
| `icon.sizes.2xl` | `w-12 h-12` |

## Naming Convention

Format: `icon-{name}` (线) / `icon-{name}-fill` (面)  
Examples: `icon-heart` (线), `icon-heart-fill` (面), `icon-arrow-left`, `icon-play-fill`

Rules:
1. All icons enter a named group — no loose icon nodes
2. 线/面严格分区，不跨区混用
3. Deprecated icons move to an archive page, never deleted

## Output Directory

```
src/assets/icons/
├── icon-*.svg          # 线图 (line)
└── icon-*-fill.svg     # 面图 (filled)
```

## 历史版本

| 版本 | 日期 | 变更说明 |
|------|------|----------|
| v1.1 | 2026-05-21 | 补全 15.0 栅格与笔触参数；新增互动区专属参数与 `interactive/` 分类；新增 `1808:654` 核心互动资产映射，并收口为单色 `currentColor` 方案。 |
| v1.0 | 2026-05-20 | 建立线/面图标库存量清单与基础实现规范。 |
