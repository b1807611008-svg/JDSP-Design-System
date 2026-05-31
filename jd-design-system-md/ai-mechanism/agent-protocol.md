---
file: agent-protocol
last_updated: 2026-04-29
---

# Agent 评审协议 · Agent Protocol

> 给跨业务 Skill / 第三方 Agent 调用京东设计系统的标准契约。**没有协议 = 各 Skill 各自瞎跑**。

---

## 1. 协议核心

每个 AI Agent 在评审 / 生成京东设计资产时,必须遵守:

1. **先 Read DESIGN.md** —— 拿到全局拓扑
2. **再 Read 对应 Zone 的 README** —— 找到具体目录
3. **再 Read 组件的 ai-schema.md** —— 拿到结构化字段
4. **如需细节再 Read 对应 md(visual / business / donts)**

**不允许**:无脑 Read 整个仓库 / 跳过 ai-schema 直接生成。

---

## 2. 标准评审契约

```yaml
agent_review_contract:
  input:
    artifact_type: enum[component, page, token]
    artifact_path: string                # md 路径或 Figma URL
    review_scope: enum[visual, a11y, business, all]

  process:
    step_1_read_schema: true             # 必读 ai-schema
    step_2_check_constraints: true       # 跑硬/软约束检查
    step_3_compare_baselines: true       # 与基线对照
    step_4_generate_observations: true   # 输出观察(不是判决)

  output:
    findings:                            # 发现的差异
      - location: 组件路径或 Figma 节点
        rule_violated: HARDCODED_COLOR
        severity: hard / soft / info
        suggestion: 字符串建议
    summary: string                      # 总结
    confidence: 0-1                      # 置信度
```

---

## 3. 输出风格(从双列卡 Skill 借鉴)

**观察,不判决**:
- ✅ "此处 Token 引用与基线 22 个商品卡有差异"
- ❌ "此处 Token 用错了"

**给设计师判断空间**:
- 输出"差异 + 严重度 + 建议"
- 不输出"应该改成 X"
- 最终决策权在设计师 / 评审委员会

---

## 4. Skill 标准(基于 agentskills.io)

每个京东设计 Skill 必须:

```
{skill-name}/
├── SKILL.md                # 主 Prompt + 执行契约
├── references/             # 引用资源(基线 / 规范)
├── prompts/                # 子 Prompt(各任务变体)
└── changelog.md            # 版本历史
```

兼容 agentskills.io 标准 → 多 agent 平台可调用。

---

## 5. 已发布的 Skill

| Skill | 版本 | 用途 | 文档 |
|---|---|---|---|
| `jd-double-column-card` | v0.5.2 | 双列卡观察评价 | [[../horizontal/double-column-card/]] |

---

## 6. 规划中的 Skill

| Skill | 用途 | 优先级 |
|---|---|---|
| `jd-token-validator` | 校验组件 Token 引用合法性 | P1 |
| `jd-a11y-review` | 自动跑 a11y checklist | P1 |
| `jd-promotion-theming` | 大促主题适配 | P2 |
| `jd-figma-component-sync` | Figma 组件同步 | P2 |
| `jd-component-generator` | 自然语言生成组件代码 | P3 |

---

## 7. 第三方 Agent 接入

外部团队的 AI Agent(非京东自研)调用京东设计系统:
1. 必须 Read DESIGN.md 接受协议
2. 不允许越过 ai-schema 直接生成代码
3. 必须遵守"观察不判决"原则
4. 输出必须可被人工 review

---

## 8. 反例

| ❌ 反面 | 解释 |
|---|---|
| Agent 跳过 ai-schema 直接读 visual.md | 失去硬约束校验 |
| 输出"判决"语气("这是错的")| 应该"观察"语气 |
| Skill 不遵守 agentskills.io 结构 | 跨平台兼容性差 |
| 全量 Read 整个仓库消耗 Token | 精准 Read 对应 md |
