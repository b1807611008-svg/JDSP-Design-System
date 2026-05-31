# 上游来源与改动沿革

本 skill **不是原创**，fork 自同事公开仓库并适配进本仓库。本文件记录来源、署名与逐条改动，便于追溯与回流。

## 上游来源

| 项 | 值 |
|---|---|
| 上游仓库 | [`shizi/joycode-senior-adaptation-skill`](https://github.com/shizi/joycode-senior-adaptation-skill) |
| 上游版本 | v2.2 |
| Fork 基线 commit | `d213e3dc80e8fc971a1a49b143796a134d24aafb`（2026-05-21） |
| 原作者 | GitHub `@shizi` |
| 并入本仓库 | 2026-05-22，作为 `senior-adaptation-tool` skill |

> 上游仓库未声明开源 license。本副本仅用于团队内部协作，已完整注明来源出处；如需对外正式分发，请先与原作者确认授权。

## 改动一：一致性修复（v2.2 → v2.2.1）

上游 v2.2 迭代遗留 7 处自相矛盾，原样运行会产出错误结果。已修复，**规则设计本意未变**：

1. **行高 100% / 120% 打架** — SKILL.md §4.0.2、§7、参考代码 `processText` 仍写「行高 = 字号 ×1.0」，与 §2/§2.6/§4.1 的「行高 120%」矛盾（原样跑会让预处理画板设的 120% 被 `processText` 覆写回 100%）。全部统一为 `Math.round(字号 × 1.2)`。
2. **detach 口径三处三说法** — §4.0.4 写「默认 OFF」，§2.6/§4.1 写「预处理画板强制 detach」，README 写「默认尝试 detach」。统一为 V2.2 口径：预处理画板强制执行一次 + 出错回滚降级。
3. **参考代码停留 V2.0** — `processText` 无条件 `textAutoResize = 'WIDTH_AND_HEIGHT'`（违反 V2.1 智能选择），且缺字号上限逻辑。改为智能选择 + 补 `FS_CAP` 上限判断。
4. **废弃字段未清** — §5 汇报清单删除已废弃的 `alContainers`；validation-guide 问题 10 不再建议执行已废弃的 4.0.6。
5. **MIN_FONT 13/12 不一致** — 参考文件边界表残留「最小 13px」，统一为 12。
6. **门禁漏校验** — 见改动二。
7. **编号错乱** — §2 列表重复的「5」、章节 2.4/2.5 顺序、参考文件重复的「## 8 / ## 9」。

## 改动二：输入源去 Deco 化（本仓库适配）

**上游设计**：强制工作链路为「用户提供 Deco 地址 → Deco MCP `getCode` 拉源码作为适配依据 → Zero MCP 写回」，需同时连接 Deco MCP 与 Zero MCP。

**本仓库改动**：去掉 Deco 环节，输入源改为直接用 `zero-design` MCP 读原画板节点。

**理由**：

- 本仓库环境只配置了 `zero-design` 一个 MCP（Relay/Zero 设计画布），不接 Deco。
- skill 的适配引擎（`processText` / `isColoredTag` / `applyHeightStrategy`）本就只对 Zero 画布节点操作（`use_design_script`），**不消费 Deco 生成的代码**。
- `zero-design` 的 `get_design_metadata` / `get_design_context` / `get_variables` 已能提供 fontSize / textAutoResize / lineHeight / 布局等适配所需的全部输入——Deco 仅是上游作者设的「输入门禁」，非技术必需。
- 去 Deco 后本 skill 只依赖单一 `zero-design` MCP，与本仓库 `relay-to-design-md` / `design-md-to-relay` 同构。

**涉及改动**：SKILL.md 的 frontmatter、§强制工作链路、§0 前置门禁、§3.2、§4 Step 1、§5、§6、§7；references/validation-guide.md §0；README.md。适配引擎与全部规则逻辑**一行未动**。

> ⚠️ 此改动使本副本与上游产生**架构级分叉**，难以直接回流上游。改动一（一致性修复）可独立回流；改动二建议作为本仓库的环境适配，不强求上游接受。

## 回流上游建议

改动一的 7 处修复对上游普遍有益，建议以 issue 或 PR 形式反馈给 `@shizi`。改动二属本仓库环境特化，回流时应与改动一拆开。
