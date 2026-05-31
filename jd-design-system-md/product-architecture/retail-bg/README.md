---
zone: product-architecture
bg: retail-bg
last_updated: 2026-04-29
---

# 主站事业群 · Retail BG

> 京东 APP 主站(京东商城 + 京东到家 + 京东 PLUS),覆盖 95%+ 用户日活和 GMV。**主站是最复杂的 BG**——从家电到服饰,从大件配送到次日达,业务面最广。

---

## 业务方向

| 主业务 | 描述 |
|---|---|
| 自营商品 | 京东自营,品牌可信度核心 |
| POP 商品 | 第三方商家 |
| 大件配送 | 家电 / 家具,需要装维约定时段 |
| 京东 PLUS | 会员体系 |
| 京东到家 | 同城 1 小时达(主站子产品) |

---

## 目录结构

```
retail-bg/
├── README.md                        ← 你在这里
├── components-business/
│   ├── README.md                    # 6 大类
│   ├── product-card/                # 商品卡 ★ 高频
│   ├── cart-item/                   # 购物车项
│   ├── coupon/                      # 优惠券
│   ├── address-card/                # 地址卡
│   ├── order-card/                  # 订单卡
│   ├── filter-bar/                  # 筛选栏
│   └── ...
└── pages/
    ├── README.md                    # 12 个核心页
    ├── home/
    ├── search/
    ├── category/
    ├── pdp/
    ├── cart/
    ├── checkout/
    ├── pay/
    ├── order/
    ├── me/
    ├── auth/
    └── message/
```

---

## 主站特色场景

| 场景 | 设计要点 |
|---|---|
| **大促首屏** | 品牌氛围 + 主推商品 + 限时倒计时 + 礼花动效 |
| **PLUS 会员区** | 黑金主题 + VIP 标识 + 专属价格 |
| **直播间** | 沉浸式 + 浮动加购 + 互动打赏 |
| **百亿补贴** | 强促销标识 + 价格对比 + 限购展示 |
| **9.9 包邮** | 极简卡 + 价格突出 |

---

## 高频页面 KPI

| 页面 | 主 KPI |
|---|---|
| 首页 | DAU / 浏览深度 / 进入 PDP 率 |
| PDP | 加购率 / 收藏率 |
| 购物车 | 结算转化率 |
| 结算 | 下单转化率 |
| 支付 | 支付成功率 |

---

## 业务组件优先级

| 组件 | 优先级 | 状态 |
|---|---|---|
| ProductCard | P0 | (P1 完成完整 multi-md)|
| CartItem | P0 | (P1) |
| OrderCard | P1 | (P1) |
| CouponCard | P1 | (P1) |
| AddressCard | P1 | (P1) |
| FilterBar | P2 | (P2) |
| LiveStreamCard | P2 | (P2) |

---

## 跨事业部依赖

主站组件被其他 BG 借用(如京东到家复用 ProductCard,京东健康基于 ProductCard 改造):
- 借用方应**继承主站契约**,不允许覆盖原子层
- 重大改动走 [[../../horizontal/governance/contribution.md]]

---

## 维护

- **主 owner**:综合业务设计组(主站体验设计师)
- **review**:DS 维护组 + PM 团队
