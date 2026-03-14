---
description: >-
  Reference for BetterForms slot names and where each slot renders in the app UI.
---

# Slots / Code Injection

Slots are reusable HTML or Vue template insertion points that let you customize the BetterForms app shell and page wrapper without editing the core application code.

To edit slots in the IDE, go to:

- `Styling > Slots`

## Reference

| Slot Name | Where it renders | Notes |
| --- | --- | --- |
| `header` | Standalone app-level header area rendered below the top navigation bar | App-shell level slot handled separately from the named header-bar slots |
| `headerBrandLeft` | Left of the brand/logo area in the top navigation bar | Header-bar slot |
| `headerBrand` | Brand / app-name area in the top navigation bar | Replaces the default app-name block |
| `headerSidebarToggle` | Sidebar toggle area in the top navigation bar | Replaces the default left-nav toggle button |
| `headerLeft` | Left-side header content area | Header-bar slot |
| `headerCenter` | Center header content area | Current runtime slot name; use this instead of older `headerMiddle` wording |
| `headerRight` | Right-side header content area | Header-bar slot |
| `logout` | Logout area in the top navigation bar | Only shown when the user is authenticated |
| `sidebarLeftTop` | Above the left navigation menu items | Sidebar slot |
| `sidebarLeftBottom` | Below the left navigation menu items | Sidebar slot |
| `sidebarLeftFooter` | Footer area of the left navigation bar | Often used for logos or custom footer content |
| `formHeader` | Above the current page body | Page-wrapper slot inside the form layout |
| `formFooter` | Below the current page body | Page-wrapper slot inside the form layout |
| `appFooter` | Footer area of the overall app shell | App-shell level footer slot |

## Notes

- Slots can replace or extend default shell content depending on where they are inserted.
- `logout` is a conditional slot because the default logout control only renders for authenticated users.
- `formHeader` and `formFooter` are page-wrapper slots, so they render around the current page content rather than inside the top navigation or sidebar.
- `appFooter` renders at the app-shell level and is separate from page-level footer content.

## Advanced Note

Some slot templates can access runtime browser-side objects such as `window.formGen`, depending on where the slot is rendered and what page context is currently active.

Treat that as advanced behavior:

- it is useful for custom dynamic templates
- it should not be the main mental model for learning slots
- if you rely on it heavily, document the expected page context clearly in your own implementation notes
