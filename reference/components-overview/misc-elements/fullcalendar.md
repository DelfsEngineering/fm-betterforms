---
description: >-
  Implementation of www.fullcalendar.io calendaring component. Component based
  on https://github.com/CroudTech/vue-fullcalendar
---

# fullCalendar

Implementation of [www.fullcalendar.io](https://fullcalendar.io/) calendaring component.

Component based on [https://github.com/CroudTech/vue-fullcalendar](https://github.com/CroudTech/vue-fullcalendar)

## Runtime Shape

The live component:

- reads events from the field `model`
- passes those events into the calendar as the field value
- merges `schema.config` over a default config where `defaultView` starts as `month`

## Common Schema Keys

| Key | Type | Description |
| --- | --- | --- |
| `type` | `string` | Must be `fullCalendar` |
| `model` | `string` | Model path containing the calendar event array |
| `config` | `object` | Calendar configuration object passed into the underlying component |

Example:

```json
{
  "type": "fullCalendar",
  "model": "events",
  "config": {
    "defaultView": "month",
    "editable": true
  }
}
```

## Callback Keys

The current implementation wires these schema callback functions:

- `eventSelected(...args)`
- `eventDrop(...args)`
- `eventResize(...args)`
- `eventCreated(...args)`
- `eventRender(...args)`
- `eventMouseover(...args)`
- `eventMouseout(...args)`
- `dayClick(...args)`

These are JavaScript callback functions on the field schema, not `*_actions` arrays.

## Notes

- If you do not provide `config.defaultView`, the component defaults to `month`.
- The component passes the full field schema through to the underlying calendar component with `v-bind=\"schema\"`.
- The published docs previously referenced `*_actions` keys, but the live component code currently uses direct schema callback functions instead.
