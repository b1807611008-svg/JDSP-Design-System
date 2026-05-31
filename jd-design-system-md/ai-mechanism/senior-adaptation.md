---
zone: ai-mechanism
file: senior-adaptation-skill
last_updated: 2026-05-22
status: released
skill_path: .claude/skills/senior-adaptation-tool/
---

# 👵 /senior-adaptation-tool · 设计稿适老化适配 Skill

> 把一份 Relay/Zero 设计稿一键适配成**大字版(1.15x)**或**长辈版(1.3x)**,写回原画板右侧。
>
> 本文档是 wiki 视角的索引页。**Skill 实现**在仓库 `.claude/skills/senior-adaptation-tool/`,Claude Code 加载约定要求该路径,不可挪动。

> **归属 · 15.0 规则**:适老化 = 系统字号缩放,属 **15.0** 规则范畴,规则源是 [[../horizontal/multi-platform/font-scaling.md]](系统字号 85%-150%)。大字版 1.15x ≈ 115%(中老年档)、长辈版 1.3x ≈ 130%(适老模式默认档)。本 skill 是该字号缩放规则在设计稿层的可执行实现。

---

## 1. 它是什么

把 [[../horizontal/multi-platform/font-scaling.md]] 的字号缩放规则,封装成一个对设计稿可执行的 Claude Code skill。给定一个 Relay 原画板,自动在其右侧生成适配画板:

- **大字版(1.15x)**:最小侵入,仅放大有色标签外的常规文字,标签本身保持原大小(对齐 iOS 系统大字版行为)。
- **长辈版(1.3x)**:组件分类处理 —— 有色标签 / 图文徽章 / 用户指定的特殊组件整体等比 `rescale`,常规文字 ×1.3。

核心规则:字号四舍五入取整、最小 12px;字号上限阈值(≥24pt 大字 / ≥26pt 长辈 保持原值);行高 = 字号 ×1.2;`textAutoResize` 智能选择;不动 `padding` / `itemSpacing`。

---

## 2. 何时触发

用户在任意会话里说:
- "适老化 / 大字版 / 长辈版 / 老年模式 这个画板"
- 直接 `/senior-adaptation-tool`

并指定要适配的原画板(节点 ID 或名称)。

---

## 3. 工作链路

```
用户指定 Relay 原画板(节点 ID / 名称)
   ↓ zero-design MCP 直读结构 / 字号 / 样式 / 布局
三画板架构:原画板 → 预处理画板 → 大字版 + 长辈版
   ↓ zero-design MCP 写回原画板右侧
```

只依赖单一 `zero-design` MCP(Relay 官方 MCP),与 [[design-review.md]]、`relay-to-design-md` 同构 —— 不依赖 Deco。

---

## 4. 缩放规则速查

| 版本 | scale | 字号上限 | 处理方式 |
|---|---|---|---|
| 大字版 | 1.15x | 原字号 ≥24pt 保持原值 | 仅文字放大,自动化,无需额外确认 |
| 长辈版 | 1.3x | 原字号 ≥26pt 保持原值 | 组件分类,需交互式询问用户 |

字号取整公式 `Math.max(12, Math.round(原字号 × scale))`、完整字号对照表见 skill 内 `README.md`。

---

## 5. 文件结构

```
.claude/skills/senior-adaptation-tool/
├── SKILL.md                          # 主体(工作链路 / 门禁 / 完整规则 / 执行流程)
├── README.md                         # 概述 + 字号对照表 + 实战教训
├── UPSTREAM.md                       # 上游来源、署名、逐条改动沿革
└── references/
    ├── validation-guide.md           # 验证清单 + 常见问题
    └── tag-and-layout-patterns.md    # 有色标签识别 + 文字 + 高度策略 代码模板
```

---

## 6. 与其他 AI 资产的关系

| 资产 | 与本 skill 的关系 |
|---|---|
| [[../horizontal/multi-platform/font-scaling.md]] | **规则源** —— 本 skill 是字号缩放(85%-150%)规则的设计稿可执行实现 |
| [[design-review.md]] | 同为 V15 设计工具 skill,同走 `zero-design` MCP |
| [[agent-protocol.md]] | Agent 评审协议 —— 本 skill 是其具体实现之一 |

---

## 7. 来源(fork)

本 skill fork 自同事公开仓库 `shizi/joycode-senior-adaptation-skill` v2.2,并入本仓库(PR #65)时做了两类改动:

- **一致性修复**:修上游 v2.2 迭代遗留的自相矛盾(行高、detach 口径、参考代码版本、废弃字段等),issue #66 留档。
- **输入源去 Deco 化**:上游强制经 Deco `getCode` 拉源码;本仓库改为直接用 `zero-design` MCP 读原画板节点,只依赖单一 MCP。

来源、署名、逐条改动详见 skill 内 [`UPSTREAM.md`](../../.claude/skills/senior-adaptation-tool/UPSTREAM.md)。

---

## 8. 维护责任

| 角色 | 职责 |
|---|---|
| 终端架构组 + DS 维护组 | 字号缩放规则口径(见 [[../horizontal/multi-platform/font-scaling.md]] owner) |
| AI 机制组 | 维护 SKILL.md 工作流;升级适配规则 |
| 业务设计师 | 跑适配 + 反馈漏判 / 误判 |

---

## 9. 已知事项与演进

| 项 | 状态 |
|---|---|
| v2.2.1 并入本仓库(一致性修复 + 去 Deco 化) | ✅ 2026-05-22(PR #65) |
| 上游 v2.2 遗留 7 处一致性问题 | ✅ 已修,留档 issue #66;已回流上游 `shizi/joycode-senior-adaptation-skill#1` |
| SKILL.md §4 补「首次调用 `use_design_script` 前加载 `use-design-script` 参考资源」 | ✅ 2026-05-22 |

---

## 10. 故障排查

| 现象 | 处置 |
|---|---|
| skill 不触发 | 检查 `.claude/skills/senior-adaptation-tool/SKILL.md` 存在;Claude Code 重启 |
| 提示「未连接 zero-design MCP」 | 在 Relay/Zero 中打开目标文件、连接 `zero-design` MCP 后重试 |
| 提示「未指定原画板」 | 适配输入源是当前 Zero 文件里一个已存在的原画板,需先指定节点 ID 或名称 |
| 画板高度异常膨胀(> 原始 ×2) | 标签父容器联动放大失控 → 回滚到「不联动」简化模式(`enableParentScale: false`),见 SKILL.md §4.0.1 |
