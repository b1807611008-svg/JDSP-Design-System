---
zone: foundations
section: components-base/input
last_updated: 2026-04-29
---

# 输入类组件 · Input

> 用户输入数据的组件。**京东表单的难点在地址 / 身份证 / 银行卡等长串输入**——格式化、校验时机、键盘衔接都是反复踩坑的地方。

---

## 组件清单

| 组件 | 状态 | 用途 |
|---|---|---|
| **Input** | stable | 单行文本输入 |
| **Textarea** | stable | 多行文本输入(评价 / 反馈)|
| **SearchBox** | stable | 搜索框(带搜索图标 + 历史)|
| **Select** | stable | 下拉选择 |
| **Picker** | stable | 滚轮选择(地址 / 时间)|
| **DatePicker** | stable | 日期选择 |
| **Checkbox** | stable | 复选框 |
| **Radio** | stable | 单选 |
| **Switch** | stable | 开关 |
| **Slider** | stable | 滑动条(价格区间 / 评分)|
| **OTPInput** | stable | 验证码 6 位输入 |
| **FormField** | stable | 表单字段容器(Label + Input + Helper) |

---

## 共享设计

### 状态
所有 input 组件包含 6 状态:
`default / focus / filled / error / disabled / readonly`

### 字体
- 默认输入文字:`typography.input` (`body.m` regular)
- 占位符:`typography.placeholder` (`text.tertiary`)
- 错误文字:`caption.l` + `text.danger`

### 校验时机
- 失去焦点 → 完整校验该字段
- 提交时 → 全表单校验
- **不允许边输入边显示错误**

详见 [[../../interaction/form.md]]

---

## 长串输入格式化

| 字段 | 格式 |
|---|---|
| 手机号 | 138 1234 5678 |
| 身份证 | 110101 1990 0101 1234 |
| 银行卡 | 6228 4800 1234 5678 |
| 金额 | ¥1,234.56 |
| 日期 | 2026-04-29 |

格式化字符不计入校验长度。

---

## 键盘衔接

| 字段类型 | 键盘 |
|---|---|
| number | 数字键盘 |
| phone | 拨号键盘 |
| email | 邮箱键盘 |
| password | 密文键盘 |
| search | 搜索键盘 |
| url | URL 键盘 |
| OTP | 数字键盘(自动聚焦) |

---

## OTP 验证码特殊设计

```
[ 1 ][ 2 ][ 3 ][ ][ ][ ]
```

- 6 个独立格子
- 自动聚焦到下一格
- 支持系统短信验证码自动填入(iOS / Android API)
- 删除时退到上一格

---

## 反例

| ❌ 反面 | 解释 |
|---|---|
| 实时校验显示错误 | 用户没输完就报错 |
| 必填项不标 `*` | 用户漏填 |
| 切换字段键盘消失 | 视觉跳动 |
| Picker 滚轮没物理感 | 体验差 |
| Input 错误时无文字描述 | 不知道怎么改 |
