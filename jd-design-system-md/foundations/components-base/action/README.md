---
zone: foundations
section: components-base/action
last_updated: 2026-04-29
---

# 操作类组件 · Action

> 用户触发动作的最小单元。**Button 是核心,其他都是它的特化版本**。

---

## 组件清单

| 组件 | 状态 | 用途 | 文档 |
|---|---|---|---|
| **Button** | stable | 通用按钮(主 / 次 / 文字 / 危险)| [[button/README.md]] ★ |
| **IconButton** | stable | 仅图标按钮(工具栏 / 关闭 X) | (待补 P1) |
| **FAB**(浮动操作按钮)| stable | 浮动主操作(我的页"客服" / 直播间) | (待补 P1) |
| **ButtonGroup** | stable | 按钮组(2-3 个并排) | (待补 P1) |
| **SegmentedControl** | stable | 分段选择器(2-4 个选项)| (待补 P1) |
| **Link** | stable | 超链接(京东文字蓝)| (待补 P2) |
| **FloatingButton** | beta | 悬浮气泡按钮 | (待补 P2) |
| **SocialButton** | beta | 社交渠道按钮(微信 / 微博 等)| (待补 P2) |

★ Button 是已完成的范本,其他组件参考 Button 的 multi-md 结构。

---

## 操作类组件设计原则

1. **可点区 ≥ 44pt × 44pt**(详见 [[../../../horizontal/a11y/touch-target.md]])
2. **主操作明确**(一屏 ≤ 1 个 primary)
3. **状态完整**(default / pressed / disabled / loading)
4. **反馈即时**(200ms 内有视觉/触觉反馈)
5. **危险操作有撤销**(删除 / 退订 / 注销)

---

## 跨组件共享行为

- **press 反馈**:`motion.button.press` (`immediate` + `easing.standard`)
- **触觉反馈**:Light haptic
- **loading 拦截点击**:所有可提交组件
- **disabled 不依赖透明度**:用 disabled token

---

## 与 input 类的边界

| 组件 | 类目 | 区别 |
|---|---|---|
| Button | action | 触发一次性操作 |
| Switch | input | 维持状态(开/关) |
| Checkbox | input | 多选 |
| Radio | input | 单选 |
| SegmentedControl | action | 切换视图(不改数据)|

> **判断标准**:操作改变后端状态 → input;操作切换前端展示 / 触发流程 → action
