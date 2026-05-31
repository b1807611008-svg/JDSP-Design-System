---
zone: foundations
section: components-base/display
last_updated: 2026-04-29
---

# 展示类组件 · Display

> 不接受用户操作,纯展示信息。**Price 是京东特色组件**——价格的视觉权重、颜色、字体、对齐都是品牌资产。

---

## 组件清单

| 组件 | 状态 | 用途 |
|---|---|---|
| **Avatar** | stable | 头像(圆形 / 方形 / 编辑态) |
| **Badge** | stable | 角标(dot / 数字 / 文字) |
| **Tag** | stable | 标签(自营 / 限时 / 活动)|
| **Card** | stable | 通用卡片容器 |
| **Divider** | stable | 分隔线 |
| **Empty** | stable | 空状态 |
| **Skeleton** | stable | 骨架屏 |
| **Image** | stable | 图片(带占位 / 错误态)|
| **Price** | stable | **京东特色** ★ 价格展示 |
| **Rating** | stable | 星级评分 |
| **Quote** | stable | 引用块(评论 / 客服)|
| **Tooltip** | stable | 气泡提示 |
| **Marquee** | stable | 跑马灯(公告 / 通知)|
| **Countdown** | stable | 倒计时(限时 / 抢购)|

---

## Price 组件 · 京东特色

价格是京东最重要的展示组件,**视觉权重是其他文字 2-3 倍**。

### 4 种规格
| 规格 | 字号 | 用途 |
|---|---|---|
| `Price.Large` | `display.m` (28pt) bold | PDP 主价 |
| `Price.Medium` | `heading.h2` (20pt) bold | 卡片价格 |
| `Price.Small` | `body.l` (17pt) semibold | 列表项价格 |
| `Price.Mini` | `body.s` (13pt) regular | 角落辅助价 |

### 整数大小数小
"¥**99**.00" 中:
- ¥ 符号:同小数字号
- 整数部分:主字号 bold
- 小数部分:小字号 regular(比整数小 1-2 阶)

### 对齐
价格垂直 baseline 对齐(整数底部对齐),不要中线对齐。

### 划线价
`<Price.Strikethrough>¥199.00</Price.Strikethrough>`
- 字号:`caption.l`
- 颜色:`text.tertiary`
- 删除线 + 灰色

---

## Tag 类型

| Token | 用途 |
|---|---|
| `tag.brand` | 京东红底白字(自营 / 京东保) |
| `tag.warning` | 警示橙底(限时 / 紧张) |
| `tag.success` | 绿底(已售 / 完成) |
| `tag.info` | 蓝底(新功能 / 提示) |
| `tag.outline` | 描边款(普通分类) |

**铁律**:**一张卡片 ≤ 3 个 Tag**。超过则视觉混乱。

---

## Avatar 类型

| 形状 | 用途 |
|---|---|
| 圆形 | 用户头像(默认) |
| 方圆角 | 店铺头像 |
| 方形 | 商家 / 品牌 |
| 编辑态 | 头像右下小铅笔 |

尺寸:24 / 32 / 40 / 56 / 80 / 120 pt

---

## Skeleton 形状还原

骨架屏形状要与真实内容一致:
```
真实卡片:[商品图] [标题] [价格] [按钮]
骨架屏  :[ 灰块 ] [灰条 ] [灰条] [灰块]
```

不还原 = 加载完成跳变,视觉不连续。

---

## 反例

| ❌ 反面 | 解释 |
|---|---|
| 价格不用 number 字族 | 数字跳动 |
| 价格不用京东红 | 削弱品牌触发器 |
| 一张卡片 5+ Tag | 视觉混乱 |
| Skeleton 形状与实际差很大 | 视觉跳变 |
| 倒计时格式不统一(00:01:23 vs 1分23秒) | 跨业务不一致 |
