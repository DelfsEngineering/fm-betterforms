---
description: Opens or closes a BetterForms card modal that renders another page.
---

# showCardModal / hideCardModal

Card modals are page-based modal windows. They are different from `showModal` / `hideModal`, which control the standard Sweet Modal dialog.

Use `showCardModal` when you want to open another BetterForms page inside a modal window.

## Action Summary

| Action | Purpose |
| --- | --- |
| `showCardModal` | Opens a card modal window |
| `hideCardModal` | Closes the active card modal |

## Minimal Example

```json
{
  "action": "showCardModal",
  "options": {
    "slug": "customer-detail"
  }
}
```

To close the modal:

```json
{
  "action": "hideCardModal"
}
```

## Notes

- `showCardModal` creates a BetterForms window and loads another page into it.
- `hideCardModal` closes the active card modal through the runtime event bus.
- These actions are separate from `showModal` / `hideModal`.
- For the full card modal option set, use the page-level reference here:
  - [Card / Window Modals](../../form-settings/card-modals.md)

## Common Uses

- open a record detail page from a list
- show a child form without leaving the current page
- build modal workflows that still use BetterForms pages and hooks
