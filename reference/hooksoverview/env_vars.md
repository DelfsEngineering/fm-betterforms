# Reducing Payload Size

By default, utility hooks will **not** send their full schema unless the `Send full schema in utility hooks` setting in the page editor is enabled. This allows the browser to send a reduced data payload resulting in faster transfer times.

In the page editor, that setting is available on the `Integration` tab:

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-23 at 4.05.28 PM.png" alt="Integration tab showing Send full schema in utility hooks"><figcaption></figcaption></figure>

## What Gets Sent By Default

When `sendFullSchema` is **off**, BetterForms trims the utility-hook payload before sending it to FileMaker.

In that reduced mode, BetterForms removes the large page/schema structures and keeps a lightweight `form` object with the current `hookSetName`.

Use full-schema payloads only when your FileMaker hook really needs page/schema/site context.

## Controlling `payload.model`

For `runUtilityHook`, BetterForms supports two browser-side ways to reduce or reshape the `model` that is sent:

### `options.modelFilterKeys`

`modelFilterKeys` keeps only selected keys from the current page model before the payload is sent.

This follows Lodash `pick` behavior on the current model object.

```json
{
  "action": "runUtilityHook",
  "options": {
    "modelFilterKeys": ["activeContact"],
    "type": "save"
  }
}
```

Use this when you want to send a smaller subset of the existing page model.

### `options.model`

`model` overrides the outgoing model payload entirely.

This is commonly paired with a `function` or `model_calc` pattern that builds a smaller object just for the hook call.

```json
{
  "action": "runUtilityHook",
  "options": {
    "model": {
      "activeContact": {
        "id": "123"
      }
    },
    "type": "save"
  }
}
```

Use this when you want to send a custom object instead of the page's normal model shape.

## Merge Behavior On Return

When `runUtilityHook` uses `options.model` or `options.modelFilterKeys`, BetterForms marks the request with:

- `state.modelUpdateMode = "merge"`

On the way back from FileMaker:

- if the hook returns `result.model` and no explicit `state.modelUpdateMode`, BetterForms now defaults to `merge`
- merge mode applies the returned keys onto the current client model
- replace mode must be requested explicitly with `state.modelUpdateMode = "replace"`

This matters because merge mode preserves client-only reactive keys while still applying the server's returned values.

## Practical Example

```json
{
  "action": "runUtilityHook",
  "options": {
    "modelFilterKeys": ["activeContact"],
    "type": "save"
  }
}
```

If FileMaker returns:

```json
{
  "model": {
    "activeContact": {
      "id": "123",
      "status": "saved"
    }
  }
}
```

BetterForms merges that returned object into the existing page model unless the response explicitly sets `state.modelUpdateMode` to `replace`.



 



