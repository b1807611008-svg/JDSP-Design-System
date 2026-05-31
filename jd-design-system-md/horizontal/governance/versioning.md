---
file: versioning
last_updated: 2026-04-29
---

# 版本管理 · Versioning

> 京东设计系统采用 SemVer(Semantic Versioning)2.0。**每个组件 / Token 都有独立版本**,设计系统整体也有版本号。

---

## 1. SemVer 规则

```
v{Major}.{Minor}.{Patch}

举例:
v1.0.0 → 初版发布
v1.0.1 → 修复 bug
v1.1.0 → 新增功能 / 组件
v2.0.0 → Breaking Change
```

| 类型 | 何时升 |
|---|---|
| Major | API 不兼容 / 删除 prop / 改变默认值 |
| Minor | 新功能 / 向后兼容 / 新增 prop variant |
| Patch | bug 修复 / 文档 / 非破坏性优化 |

---

## 2. 三层版本

| 层 | 版本 | 例子 |
|---|---|---|
| 设计系统整体 | v1.0.0 | 京东 15.0 设计语言 = 设计系统 v1.0 |
| 单个组件 | Button v1.4.2 | 各组件独立演进 |
| 单个 Token | tokens.json v1.2 | Token 文件整体版本 |

---

## 3. 版本号在哪里

```yaml
# DESIGN.md(设计系统整体)
version: v1.0.0

# 组件 README.md
version: 1.4.2

# tokens.json 顶部
version: 1.2.0

# 组件 ai-schema.md
meta:
  version: 1.4.2
```

---

## 4. CHANGELOG 标准

每个组件 / Token / 主文档目录都有 CHANGELOG.md:

```markdown
## v1.4.2 · 2026-03-15
**Patch · 修复**
- 修复 ...

## v1.4.0 · 2026-02-10
**Minor · 增强**
- 新增 ...

## v1.0.0 · 2025-08-15
**Major · 初版发布**
- ...
```

---

## 5. Breaking Change 通知

Major 升级前 30 天:
1. 在 DS 内部群发通告
2. 在 GitHub Issue / 内部系统标注 BREAKING
3. 影响范围扫描:列出所有引用方
4. 提供迁移指南

---

## 6. 旧版本兼容

| 状态 | 行为 |
|---|---|
| stable | 推荐使用,持续维护 |
| deprecated | 弃用警告,过渡期 6 个月 |
| removed | 已删除,不可用 |

老组件即使 deprecated 也保留可访问,直到下个 Major。

---

## 7. 主题包版本独立

大促主题包:
```
tokens.618.json v2024(2024 年 618 资产)
tokens.618.json v2025(2025 年 618 资产)
tokens.618.json v2026(2026 年 618 资产,当前)
```

业务方可指定使用历史主题(如怀旧大促),但默认使用最新。

---

## 8. 反例

| ❌ 反面 | 解释 |
|---|---|
| 不遵守 SemVer(随便升 Major)| 业务方不知道是否破坏性 |
| Breaking Change 不通知 | 业务方 break |
| 删除 deprecated 不留过渡期 | 业务方代码出错 |
| CHANGELOG 不写"为什么"| 后人不理解决策 |
