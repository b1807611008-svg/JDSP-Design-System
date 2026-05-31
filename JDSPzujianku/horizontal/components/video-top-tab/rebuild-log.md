# VideoTopTab Relay Rebuild Log

## Target

- Relay file: `2054381889128513537`
- Target page id: `7:3`
- Target page name: `Interaction Area Rebuild Test`
- Created stage: `8:1` — `VideoTopTab Rebuild Test / from design.md`

## Created Nodes

### Standard / Default

- `8:4` — `VideoTopTab / standard / default`, `362×44`
- `8:5` — `VideoTopTab Icon Hit / icon-back-video / size.video_top_tab_icon_hit`, `28×44`
- `8:9` — `VideoTopTab Icon Hit / icon-menu-video / size.video_top_tab_icon_hit`, `44×44`
- `8:15` — `TabList / standard / viewport / 246x44 / selected 视频`, `246×44`
- `8:16` / `8:18` / `8:20` / `8:22` / `8:24` — TabItems for `直播 / 推荐 / 小说 / 短剧 / 视频`
- `8:26` — `Indicator / selected / inherit-current-tab-text-token`
- `8:27` — `VideoTopTab Icon Hit / icon-search-video / size.video_top_tab_icon_hit`, `44×44`

### Immersive / Default

- `8:35` — `VideoTopTab / immersive / default`, `363×44`
- `8:36` — `VideoTopTab Icon Hit / icon-menu-video / size.video_top_tab_icon_hit`, `44×44`
- `8:42` — `TabList / immersive / viewport / 275x44 / right-anchored-left-peek / selected 视频`, `275×44`
- `8:43` — `TabList Track / immersive / channels with left peek`, `318×44`, `x=-43`
- `8:44` / `8:46` / `8:48` / `8:50` / `8:52` / `8:54` — TabItems for `关注 / 直播 / 推荐 / 小说 / 短剧 / 视频`
- `8:56` — `Indicator / selected / color-title_immerse`
- `8:57` — `VideoTopTab Icon Hit / icon-search-video / size.video_top_tab_icon_hit`, `44×44`

## Created / Used Assets

Imported real private SVG assets from `JDSPzujianku/horizontal/components/video-top-tab/assets/icons`:

- `icon-back-video.svg`
- `icon-menu-video.svg`
- `icon-search-video.svg`

`icon-forward-video.svg` exists but was not used in this first pass because quick-return / secondary navigation was not created.

## Styles And Tokens

- Text uses `PingFang SC / Medium`, 16dp, 22dp line height, mapped to `font_size_body_sm + font_weight_medium`.
- Standard/default text and icon color uses `color/title` semantic value.
- Immersive/default selected text and icon color uses `color/title_immerse`.
- Immersive/default unselected tabs use `color/text_immerse` semantics via 80% white opacity.
- Indicator color inherits current selected text token.

No new local style objects were created in this pass; values were applied node-level to keep the rebuild focused.

## Missing / Deferred Items

- `standard/dark` and `immersive/dark` theme variants.
- `sticky` variant and sticky background transition.
- `edge-fade` mask layer for scroll state.
- `quick-return` right-side affordance using `icon-forward-video.svg`.
- `dropdown`, `folded`, `noise-reduction`, and `activity` layers.
- Exact source TabItem text widths and activity asset measurements.

## MCP Approximation Notes

- The top bar samples use measured DP protocol from `spec.md` / `ai-schema.yaml`: content `362×44`, standard TabList `246×44`, immersive TabList `275×44`, icon hit `44×44`, icon visual `22×22`.
- Immersive background is represented by a dark video-stage placeholder, not a real video frame.
- Text shadows and edge fade masks were not recreated because the corresponding tokens are documented as missing or TODO.
- Relay auto-renames text nodes to their characters in some script results, so final metadata was re-normalized to keep label bounds centered inside each TabItem.

## Next Steps To Expand

1. Add `standard/dark` and `immersive/dark` by reusing the same layout and changing only background / text / icon tokens.
2. Add `edge-fade` overlays inside the TabList viewport without covering fixed function slots.
3. Add `quick-return` state and use `icon-forward-video.svg` in the right 44×44 slot.
4. Add `sticky` standard-flow variant with semantic background / mask tokens.
5. Add `dropdown` and `noise-reduction` layers after channel data and protected-tab rules are confirmed.
