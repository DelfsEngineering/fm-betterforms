---
description: >-
  Good components need to be designed well. Taking the time to think of future
  use cases significantly enhances the components usability.
---

# Component Best Practices

{% hint style="info" %}
**For Third-Party Library Integration:** See the complete guide: [Creating Components with Third-Party Libraries](../../integrations/creating-components-with-third-party-libraries.md) with full FullCalendar, Chart.js, and Leaflet examples.
{% endhint %}

### Sizing and Styling

Generally, it should be the implementation of the component that is responsible for the component's size.  There are some exceptions. This means that the width of your component is generally full width and the parent or 'implementor' of the component will control the width.&#x20;

Examples:

| Component Type        | What sets size | Comments                                                                                                                               |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Page Header Component | Parent         | this allows the header                                                                                                                 |
| Button Component      | Component      | Buttons generally don't take on the shapre of the parent elements. When you need to override a buttons width, you can pass in a class. |
| Toggle switch         | Component      | Generally this type of component woudl not adapt its size to the parent                                                                |
| Toggle switch Array   | Parent         | An array of toggles would wrap or flow based on the containing element                                                                 |

### Actions

#### Lifecycle & Async
- Use `onBeforeMount` for blocking setup (library load, data fetch); it awaits before render. Use `onMount` for DOM work after render.
- Always `await` async work inside function actions to preserve order; `bfcomponent` lifecycle dispatch already awaits `ACTIONS_QUEUE`.
- Load external libraries with `BF.libraryLoadOnce()`; no extra singleton guard needed for identical URLs.

#### Schema in Actions
- Lifecycle actions receive the component schema on `action.schema` (and `action.options._componentSchema`).
- Template-triggered actions: pass schema explicitly when needed, e.g. `@click="namedAction('doThing', { schema, foo: 'bar' })"`.
- In functions, read with: `const schema = action.schema || action.options._componentSchema || action.options.schema || {};`.

#### DOM & Refs
- `this.$refs` is not available in namedAction functions. Use DOM queries: `document.getElementById(...)` or `querySelector(...)`.
- Give stable IDs in your HTML if you need to target elements from actions.

#### EventBus & async namedActions
- `runUtilityHook` (and similar) support callbacks; wrap in a Promise:
  ```javascript
  const result = await new Promise((resolve, reject) => {
    EventBus.$emit('runUtilityHook', payload, (res) => res?.error ? reject(res.error) : resolve(res));
  });
  ```
  This keeps async actions serialized with lifecycle dispatch.

### Context

- Avoid `this` inside namedAction functions; rely on injected vars: `model`, `app`, `document`, `window`, `BF`, `_`, and `schema` (lifecycle only).
- Keep global/window writes idempotent; guard with `window.__bfSingletons` only for truly global resources (e.g., registering Vue components).
- For third-party instances (charts, uploaders), prefer per-instance scoping instead of global singletons.

### Multi-Instance Components
- If the same component renders multiple times, add a unique `instanceId` (or similar) in schema and namespace any globals/hosts/plugins with it.
- Example pattern: `const key = 'uppy_' + instanceId; window[key] = new Uppy.Uppy(...); hostId = 'bf-fileinput-host-' + instanceId;`.

### File Upload (Uppy + S3/FM)
- Fetch presigned URLs via `runUtilityHook`; await via the EventBus callback pattern above.
- Prefer dual URLs from backend: `url` (PUT, short expiry) and `downloadUrl` (GET, longer expiry) so users can view after upload.
- Namespace Uppy instances per `instanceId`; create per-instance hidden hosts to avoid conflicts when multiple upload buttons exist.











