---
file: schema-spec
last_updated: 2026-04-29
schema_version: jd-wiki/v0.4
---

# ai-schema.md 字段规范

> 每个组件 / 业务单元的 `ai-schema.md` 必须遵守本规范,这样 AI 才能跨组件批量消费。

---

## 1. 顶层结构

```yaml
meta:           # 元信息
props:          # 属性枚举
variants:       # 变体清单
dependencies:   # 依赖关系
dependents:     # 被依赖关系(可选)
a11y:           # 无障碍约束
constraints:    # 硬/软约束
related_skills: # 相关 Skill
related_docs:   # 相关文档锚链接
ai_query_examples:  # 常见 AI 查询示例(可选)
```

---

## 2. 必填字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `meta.component_name` | string | 组件名(PascalCase) |
| `meta.zone` | enum | 5 Zone 之一 |
| `meta.version` | semver | 版本号 |
| `meta.status` | enum | experimental / beta / stable / deprecated |
| `meta.owner_role` | string | 主 owner 角色 |
| `meta.ai_consumable` | bool | 是否通过 AI 消费验证 |
| `meta.last_updated` | date | yyyy-mm-dd |
| `props` | object | 属性枚举 |
| `dependencies.tokens` | array | 引用的 Token Path |

---

## 3. props 字段

```yaml
props:
  size:
    enum: [L, M, S, XS, Mini]
    default: M
    required: false
    note: 可选的语义注释
  text:
    type: string
    required: true
    constraints:
      - max_length: 6
      - language: zh
```

---

## 4. variants 字段

```yaml
variants:
  - id: primary-cta              # 必填,kebab-case
    description: 业务用途
    constraints:
      - 字符串约束 1
      - 字符串约束 2
```

---

## 5. constraints 字段(硬/软)

```yaml
constraints:
  hard:                          # 违反必报错
    - id: NO_HARDCODED_COLOR     # 必填,大写下划线
      rule: 规则描述
      check: lint                # lint / ci_static / ci_runtime / ci_visual / governance_review

  soft:                          # 违反需 review
    - id: TEXT_LENGTH_RECOMMEND
      rule: 规则描述
      check: warn_only
```

---

## 6. a11y 字段

```yaml
a11y:
  min_touch_target: 44pt
  contrast_ratio:
    text_on_primary: 4.5
    disabled_text: 3.0
  voiceover_label: required      # required / optional / auto
  reduce_motion:
    respect_system_setting: true
    fallback: instant_state_change
```

---

## 7. dependencies / dependents

```yaml
dependencies:
  tokens: [color.brand.primary, spacing.4, ...]
  components: [Icon, Loading]    # 引用的其他原子组件

dependents:
  components: [IconButton, ButtonGroup]
  business_components: [ProductCard.AddToCart, ...]  # 列出主要的,不必穷举
```

---

## 8. related_skills / related_docs

```yaml
related_skills:
  - id: jd-double-column-card
    relation: 描述关系

related_docs:
  philosophy: knowledge/philosophy/focused-effective.md
  a11y: horizontal/a11y/checklist.md
  governance: horizontal/governance/contribution.md
```

---

## 9. ai_query_examples(可选)

```yaml
ai_query_examples:
  - query: 自然语言问题
    expected_output:
      type: ...
      validation_passed: true
```

帮助 AI 理解组件如何被使用。

---

## 10. CI 校验

DS 维护组的 CI 任务每日扫描所有 ai-schema.md:
- YAML 合法性
- 必填字段完整
- 引用的 Token 在 tokens.json 中存在
- 引用的相关组件存在
- 引用的 related_docs 路径存在

不合法 schema → 自动 block PR。

---

## 11. Schema 版本

当前 v0.4。Schema 升级时:
1. DS 维护组发布新 schema
2. 各组件 owner 7 天内迁移
3. 过期未迁移自动报错

---

## 12. 反例

```yaml
# ❌ 不合规范的 ai-schema.md

meta:
  name: button                   # ❌ 应该 PascalCase: Button
  version: "1.0"                 # ❌ 应该 semver: 1.0.0
  status: ok                     # ❌ 不在 enum 中

props:
  type: ["primary", "secondary"]  # ❌ 应该 enum: [primary, secondary]

# 缺失 dependencies 字段                      # ❌ 必填
```
