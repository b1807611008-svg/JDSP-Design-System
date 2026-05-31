---
zone: product-architecture
bg: retail-bg
section: components-business
last_updated: 2026-04-29
---

# 主站业务组件 · Components Business (Retail BG)

> 主站事业群专属业务组件。**对应 PDF 大纲第 8 章 业务组件库的主站实现**。

---

## 6 大业务组件类目

| 类目 | PDF 8.x | 组件清单 | P1 优先级 |
|---|---|---|---|
| **商品组件** | 8.1 | ProductCard / ProductImage / ProductTitle / Price / SKU 选择 / 评分 | ★ 高 |
| **购物流程** | 8.2 | CartItem / CartSummary / CheckoutItem / OrderSummary | ★ 高 |
| **订单组件** | 8.3 | OrderCard / OrderStatus / Logistics / OrderActions | 高 |
| **搜索筛选** | 8.4 | SearchBar / FilterBar / SortBar / TagSelector | 中 |
| **用户中心** | 8.5 | (跨 BG,见 cross-bg/) | - |
| **营销组件** | 8.6 | CouponCard / FlashSaleTimer / PromoBanner / VIPCard | 高 |

---

## 商品组件 · 8.1

### ProductCard(双列卡 + 列表卡 + 大图卡)
- 受 [[../../../horizontal/double-column-card/SKILL.md]] 五大家族 DNA 治理
- 主站属于"商品家族"
- 详见 [[product-card/README.md]](P1 完成)

### ProductImage
- 主图比例 1:1
- 角标位置规则(最多 3 个)

### Price
- 引用 [[../../../foundations/components-base/display/README.md#price]]
- 主站价格场景:主价 / 划线价 / 会员价 / 百亿补贴价

### SKU 选择(Sheet)
- 底部抽屉
- 规格选择(颜色 / 尺码 / 规格)
- 数量调整
- 主 CTA(加购 / 立购)

---

## 购物流程组件 · 8.2

### CartItem
- 商品图 + 标题 + 规格 + 价格 + 数量调整 + 删除
- 左滑删除 + 收藏切换
- 失效商品置灰

### CartSummary
- 总价 + 优惠券 + 运费
- 主 CTA"去结算"
- 已选数量提示

### CheckoutItem(结算页)
- 简化版 CartItem(只展示)
- 不可编辑数量

---

## 订单组件 · 8.3

### OrderCard
- 订单号 + 时间 + 状态 + 商品缩略图 + 总价 + 操作按钮
- 状态:待支付 / 待发货 / 待收货 / 已完成 / 已取消

### Logistics
- 时间轴展示物流状态
- 关键节点(下单 / 出库 / 派送 / 签收)

---

## 搜索筛选 · 8.4

### SearchBar
- 输入框 + 搜索按钮 + 历史搜索 + 热搜

### FilterBar
- 筛选条件(类别 / 价格区间 / 品牌)
- 多选 + 单选混合
- 重置 + 确认

---

## 营销组件 · 8.6

### CouponCard
- 优惠券面值 + 使用条件 + 有效期 + 领取/使用按钮
- 可叠加状态展示

### FlashSaleTimer
- 倒计时 + 抢购数量 + 进度条

### PromoBanner
- 促销大 banner(频道页 / 频道入口)

---

## 业务组件继承约束

每个业务组件继承 foundations 的原子组件:
- ProductCard 内的"加购"按钮 = `Button type=primary size=S` + 业务逻辑(库存校验 / 限购)
- CartItem 内的"删除"= `IconButton` + 二次确认
- OrderCard 内的"去支付"= `Button type=primary size=L block`

**禁止**:业务组件覆盖原子组件视觉(详见 [[../../../foundations/components-base/action/button/donts.md#BG_OVERRIDE_ATOM]])

---

## 跨 BG 借用

主站业务组件被其他 BG 借用:
- 京东到家复用 ProductCard → 加"30 分钟达"标识(family DNA 不变)
- 京东健康基于 OrderCard 改造 → 加"医生认证"标识

借用走治理评审,记录在 [[../../../horizontal/governance/contribution.md]]
