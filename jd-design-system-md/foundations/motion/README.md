---
zone: foundations
section: motion
last_updated: 2026-04-29
---

# 动效规范 · Motion

> 动效是设计语言的"语调"。京东动效**克制 + 有目的**,不为炫技。

---

## 文档清单

| 文档 | 涵盖 |
|---|---|
| [[principles.md]] | 设计原则(目的导向 / 克制 / 物理感)|
| [[curves.md]] | 缓动曲线体系(引用 motion Token)|
| [[duration.md]] | 时长规则(immediate / fast / normal / slow)|
| [[choreography.md]] | 编排(阶梯入场 / 元素串场 / 转场关系)|
| [[scenes.md]] | 典型场景(加购飞动画 / 大促礼花 / 翻牌 / 滑动)|

---

## 与 Token 的边界

| 关注点 | 在哪 |
|---|---|
| duration / easing 数值 | [[../tokens/motion.md]] |
| 何时用什么动效 | 本目录 [[principles.md]] / [[scenes.md]] |
| 动效编排时序 | [[choreography.md]] |

---

## 减少动效模式

iOS / Android 系统设置开启"减少动效"时:
- 大幅度动效(转场 / 飞动画 / 礼花)→ 替换为淡入或直接切换
- 微交互(按钮按下 / Toast)→ 保留(用户体验必需)

详见 [[../../horizontal/a11y/motion-reduce.md]]
