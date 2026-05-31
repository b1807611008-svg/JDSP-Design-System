---
zone: foundations
section: components-base/feedback
last_updated: 2026-04-29
---

# 反馈类组件 · Feedback

> 让用户知道"系统在做什么 / 我现在该做什么"。**反馈层级混乱是最大事故源**。

---

## 组件清单

| 组件 | 状态 | 用途 |
|---|---|---|
| **Toast** | stable | 操作反馈,2-3 秒自动消失 |
| **Dialog** | stable | 关键决策弹窗 |
| **Sheet** | stable | 底部抽屉(SKU / 筛选)|
| **Lightbox** | stable | 全屏蒙层(图片大图 / 视频)|
| **Loading** | stable | 全屏加载占位 |
| **Spinner** | stable | 局部加载圈 |
| **ProgressBar** | stable | 进度条(已知进度)|

---

## 4 种模态对比

| 类型 | 阻塞 | 自动关闭 | 何时用 |
|---|---|---|---|
| Toast | ❌ | ✅ 2-3 秒 | 操作反馈("已加购") |
| Dialog | ✅ 完全 | ❌ | 关键决策 |
| Sheet | 半阻塞 | ❌ | SKU / 筛选 / 二级 |
| Lightbox | ✅ 完全 | ❌ | 图片大图 / 视频 |

详见 [[../../interaction/modal.md]]

---

## Loading 模式选择

| 场景 | 用什么 |
|---|---|
| 整页首次加载 | Skeleton(在 display 类目)|
| 局部数据(列表加载下一页)| Spinner |
| 按钮提交中 | 按钮内 spinner(Button 组件自带)|
| 上传 / 下载 | ProgressBar |
| 已知短任务 | Toast loading |

---

## Toast 类型

| Token | 用途 | 时长 |
|---|---|---|
| `toast.success` | 成功 | 2 秒 |
| `toast.warning` | 警告 | 2 秒 |
| `toast.error` | 错误 | 3 秒 |
| `toast.info` | 提示 | 2 秒 |
| `toast.loading` | 加载中(配 spinner)| 任务结束 |

铁律:**同时只能存在 1 个 Toast**(新 Toast 替换旧)。

---

## Dialog 文案

| 元素 | 字数限制 |
|---|---|
| 标题 | ≤ 12 字 |
| 内容 | ≤ 50 字(2 行) |
| 主按钮 | ≤ 4 字(具体动词)|
| 次按钮 | ≤ 4 字 |

铁律:不用"是 / 否",用"永久删除 / 保留"具体动词。

---

## Sheet 多层叠加

最多 3 层(SKU → 优惠券 → 详情)。超过 3 层 = 用户迷失。

---

## 反例

| ❌ 反面 | 解释 |
|---|---|
| Toast 内放按钮 | 一过性,不该承载操作 |
| Dialog 蒙层点击关闭 | 应该显式选择 |
| Sheet 嵌套超 3 层 | 用户迷失 |
| 加载无反馈 > 1 秒 | 用户感觉死机 |
| Lightbox 无关闭按钮 | 出不去 |
