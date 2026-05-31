---
file: assets-cdn
bundle_part_of: design.md
slug: "image-card"
last_synced: "2026-05-31"
---

# 基础内容卡 · 位图 / SVG 资产清单

> 本文件为辅助资产清单，不计入 6 文件正文 bundle。  
> 资产来源：Relay 节点 `1042:4844` 的 IMAGE fill 与 SVG wrapper。  
> 当前状态：左上角卡片标签 icon 已从 Relay `1042:3616` 导出到本地；封面 / 头像 / 商品图仍需后续补跑导出。

## 本地资产库路径

```text
JDSPzujianku/horizontal/components/Image Card/assets/
```

## 位图资产

| 用途 | Relay 节点 | 建议文件 | CDN URL | 状态 |
|---|---|---|---|---|
| 内容封面图 | `1640:271` / `1641:1` / `1641:6` / `1641:13` / `1641:19` / `1641:2` / `1641:25` / `1648:8687` | `assets/cover-sample.png` | TODO | 待导出 |
| 作者头像 | `1640:206` / `1640:212` | `assets/avatar-sample.png` | TODO | 待导出 |
| 商品缩略图 | `1640:186` | `assets/product-sample.png` | TODO | 待导出 |

## SVG / 图标资产

| 用途 | Relay 节点 | 建议文件 | 归属建议 | 状态 |
|---|---|---|---|---|
| 多图 / 图文标识 | `1042:3634` | `src/assets/icons/icon-copy-fill.svg` | 复用全局 Icon.md，不复制到组件私有资产 | 已复用 |
| 视频标识 | `1042:2742` | `assets/tag-video.svg` | 组件私有角标 icon | 已导出 |
| 点赞 | Icon.md `icon-heart` | `src/assets/icons/icon-heart.svg` | 复用全局常规线性 Icon，不使用右侧互动区 `interactive/` icon | 已复用 |
| 浏览量 | Icon.md `icon-browse` | `src/assets/icons/icon-browse.svg` | 复用全局 Icon | 已复用 |
| 种草 | Icon.md `icon-like` | `src/assets/icons/icon-like.svg` | 复用全局常规线性 Icon，不使用右侧互动区 `interactive/` icon | 已复用 |
| 直播中 / 观看提示标识 | `1042:2749` / `1042:2754` / `1042:3593` | `assets/tag-live-on.svg` | 组件私有角标 icon，可单独或嵌入文字胶囊 | 已导出 |
| 飙升值标识 | `1042:3628` | `assets/tag-rise.svg` | 组件私有角标 icon | 已导出 |
| 动图 / live 标识 | `1572:11` | `assets/tag-live.svg` | 组件私有角标 icon，16 x 16 px 纯图标无底色 | 已导出 |
| 话题箭头 | `1719:3242` / `1641:11` | `assets/icon-arrow.svg` | 优先复用全局 arrow icon | 待导出 |

## 导出记录

| 时间 | 动作 | 结果 |
|---|---|---|
| 2026-05-30 | 尝试通过 `localhost:27618/assets/*` 下载 | 失败，shell 无法连接临时 asset server |
| 2026-05-30 | 尝试通过 `relay.getNodeByIdAsync(...).exportAsync(...)` 导出 | 失败，`use_design_script` 自动权限审核两次超时 |
| 2026-05-31 | 通过 `relay.getNodeByIdAsync(...).exportAsync({ format: "SVG_STRING" })` 导出角标 icon | 成功导出 `tag-video.svg` / `tag-live-on.svg` / `tag-rise.svg` / `tag-live.svg`；多图图标按规范复用 `icon-copy-fill.svg` |

## 补跑建议

待 Zero design script 权限恢复后，按以下节点导出：

```text
cover: 1640:271
avatar: 1042:4781;1042:4766;1640:206
product: 1042:4907;1042:4916;1640:186
video icon: 1042:4855;1042:2742
view icon: 1042:4781;1042:4766;1042:4795;1648:8946;1887:6
recommend icon: 1641:4;1042:4766;1042:4806;1042:3898;1719:5291
image icon: 1042:4901;1791:7;1737:56
arrow icon: 1641:11
```

左上角卡片标签 icon 已完成，无需补跑：

```text
multi image: src/assets/icons/icon-copy-fill.svg
video: assets/tag-video.svg
live on / just watched / view count: assets/tag-live-on.svg
rising value: assets/tag-rise.svg
live: assets/tag-live.svg
```

## 已确认全局 Icon 复用

| 业务语义 | Icon.md 映射 | 本地 SVG |
|---|---|---|
| 点赞 | `icon-heart` | `JDSPzujianku/src/assets/icons/icon-heart.svg` |
| 浏览量 | `icon-browse` | `JDSPzujianku/src/assets/icons/icon-browse.svg` |
| 种草 | `icon-like` | `JDSPzujianku/src/assets/icons/icon-like.svg` |
