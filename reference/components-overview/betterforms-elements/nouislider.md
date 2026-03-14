# Range Slider (noUiSlider) Element

The Range Slider element allows users to select a single value or a range of values by sliding handles along a track. It's highly customizable and suitable for selecting numeric ranges, like price, age, or percentages.

In BetterForms, this element leverages the `noUiSlider` library to provide a touch-friendly and flexible range selection interface.

## Common Configuration Properties

| Property          | Type    | Description                                                                                                   |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------ |
| `type`            | `String`| Must be set to `"noUiSlider"`.                                                                                |
| `label`           | `String`| The label for the range slider.                                                                                 |
| `model`           | `String`| The key in your BetterForms data model where the selected value or array of values (for range) will be stored. |
| `disabled`        | `Boolean`| If `true`, the slider will be visible but not interactive. Defaults to `false`.                               |
| `readonly`        | `Boolean`| If `true`, the slider value cannot be changed. Similar to `disabled`. Defaults to `false`.                  |
| `hint`            | `String`| Additional helper text displayed below the slider.                                                              |
| `styleClasses`    | `String` / `Array` | CSS classes for styling the wrapper.                                                                          |
| `fieldOptions` | `Object` | **Crucial property.** Options passed directly into `window.noUiSlider.create(...)`. |

### `fieldOptions` common settings:

| Option        | Type    | Description                                                                                                  |
| :------------ | :------ | :----------------------------------------------------------------------------------------------------------- |
| `start`       | `Number` / `Array` | Initial value(s) of the slider. A single number for one handle, an array of two numbers for a range (e.g., `[20, 80]`). |
| `range`       | `Object`| Defines the slider's `min` and `max` values. E.g., `{ 'min': 0, 'max': 100 }`.                                 |
| `connect`     | `Boolean` / `Array` / `String` | Highlights the area between handles or from an edge to a handle. `true` for a range, `[true, false]` for lower connect. |
| `step`        | `Number`| The increment/decrement step size.                                                                             |
| `orientation` | `String`| Orientation of the slider: `"horizontal"` (default) or `"vertical"`.                                         |
| `tooltips`    | `Boolean` / `Array` / `Object` | Whether to show tooltips above the handles. Can be `true`, or an array of formatter objects.                     |
| `format`      | `Object`| An object with `to` and `from` functions for formatting the displayed values (e.g., adding units like '$' or '%'). |
| `behaviour`   | `String`| User interaction behavior, e.g., `'tap-drag'`, `'drag'`.                                                       |
| `pips`        | `Object`| Configuration for displaying pips (markers) along the slider.                                                  |

### Example Schema Snippet (Single Value Slider)

```json
{
  "type": "noUiSlider",
  "label": "Set Volume",
  "model": "volumeLevel",
  "fieldOptions": {
    "min": 0,
    "max": 100,
    "step": 1,
    "tooltips": true,
    "connect": [true, false]
  }
}
```

### Example Schema Snippet (Range Slider)

```json
{
  "type": "noUiSlider",
  "label": "Price Range",
  "model": "priceRangeArray",
  "fieldOptions": {
    "min": 0,
    "max": 1000,
    "double": true,
    "step": 10,
    "connect": true,
    "tooltips": true,
    "format": {
      "to": function (value) { return '$' + parseInt(value); },
      "from": function (value) { return Number(value.replace('$', '')); }
    }
  }
}
```

## BetterForms Specific Notes

*   The component requires the `noUiSlider` library to be loaded globally.
*   The model stores a single number for one handle, or a two-item number array for a range.
*   If the model already has a value, that value is used as the slider `start`.
*   If there is no current model value, the component builds `start` from `fieldOptions.min`, and uses `[min, min]` when `fieldOptions.double` is present.
*   `fieldOptions.pips` and `fieldOptions.tooltips` also affect wrapper classes used for spacing.

## Full Property Reference

This element wraps the `noUiSlider` library. For the available `fieldOptions`, refer to:
*   [VFG noUiSlider Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/optional-fields/nouislider)
*   [noUiSlider Official Documentation](https://refreshless.com/nouislider/) 
