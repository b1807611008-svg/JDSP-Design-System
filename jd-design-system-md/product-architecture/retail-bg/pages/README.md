---
zone: product-architecture
bg: retail-bg
section: pages
last_updated: 2026-04-29
---

# 主站页面模板 · Pages (Retail BG)

> 对应 PDF 大纲第 9 章。**12 个核心页面是京东 APP 的骨架**,占用户 95%+ 路径。

---

## 12 个核心页面

| 页面 | 文档 | 主 KPI | P1 优先级 |
|---|---|---|---|
| 🏠 首页 | [[home/README.md]] | DAU / 浏览深度 | ★ |
| 🔍 搜索页 | [[search/README.md]] | 进入 PDP 率 | ★ |
| 🗂 分类页 | [[category/README.md]] | 探索深度 | 中 |
| 📱 PDP 商品详情 | [[pdp/README.md]] | 加购率 | ★ |
| 🛒 购物车 | [[cart/README.md]] | 结算转化率 | ★ |
| 📋 结算页 | [[checkout/README.md]] | 下单转化率 | ★ |
| 💰 支付页 | [[pay/README.md]] | 支付成功率 | 高 |
| 📦 订单页 | [[order/README.md]] | 售后率 | 高 |
| 👤 我的(个人中心) | [[me/README.md]] | 会员粘性 | ★ |
| 🔐 登录注册 | [[auth/README.md]] | 注册转化率 | 中 |
| 💬 消息中心 | [[message/README.md]] | 通知处理率 | 中 |

---

## 每个页面目录的 multi-md

```
{page}/
├── README.md          # 页面定位 + 模块清单
├── business.md        # PM:业务目标 / KPI
├── research.md        # 用研:用户行为路径
├── experience.md      # 体验:信息架构 / 流程 / 状态机
├── visual.md          # 视觉:布局 / 模块视觉
├── interaction.md     # 交互:页面级手势 / 转场
├── content.md         # 内容:文案 / 营销话术
├── donts.md           # 反例
├── ai-schema.md       # AI 消费字段
├── modules/           # 页面模块清单(每个模块独立子目录)
└── states/            # 页面状态(空 / 错误 / 加载)
```

---

## 主流程页(★)的核心约束

| 约束 | 说明 |
|---|---|
| 一屏关键信息 | PDP 加购按钮在首屏可见 |
| 路径屏数 | 单流程 ≤ 5 屏 |
| 主 CTA 突出 | 京东红 + L 尺寸 + block |
| 错误恢复 | 任何报错都有重试或返回入口 |
| 转场流畅 | 共享元素动画(如商品图)|

---

## 跨页面共用元素

| 元素 | 实现 |
|---|---|
| Tab Bar(始终在底部 5 个核心页) | foundations/components-base/navigation/TabBar |
| 顶部导航 | foundations/components-base/navigation/NavBar |
| 加购飞动画 | foundations/motion/scenes.md#加购飞动画 |
| 浮动客服按钮 | foundations/components-base/action/FAB |

---

## 页面状态完整性

每个页面必须有 4 状态:

| 状态 | 描述 |
|---|---|
| 默认 | 数据正常加载完成 |
| 加载中 | Skeleton |
| 空 | 空状态(关键!如购物车空、收藏空) |
| 错误 | 网络错误 / 业务错误 |

---

## 页面级 a11y

每个页面必须通过:
- VoiceOver / TalkBack 完整阅读
- 系统字号 85% / 100% / 150% 不崩
- 减少动效模式无视觉残留
- 对比度全场景达标

---

## 维护

- **主 owner**:主站体验设计师 + PM
- **review**:DS 维护组 + 业务方
- **跨页面一致性 review**:DS 维护组每周三次
