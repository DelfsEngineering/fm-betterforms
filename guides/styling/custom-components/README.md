---
description: >-
  Components are chunks of reusable code. They allow you to define code in a
  single place and reuse it throughout your app. Components can be references
  through HTML or with BF JSON schema
---

# Custom Components

{% hint style="danger" %}
This page is under review and not finalized (beta)
{% endhint %}

### Building and Customizing

Both the BF JSON and the HTML APIs are the same. Keys within the BF JSON schema can be referenced within a component as `schema.<key>` (for example, `schema.title`).



### **Component API**
<table>
<thead>
<tr>
<th width="165">Key</th>
<th width="145.33333333333331">Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>fields</code></td>
<td>array</td>
<td>Optional either <code>html</code> or <code>fields</code> keys must be present. Contains BF schema elements normally found in the <code>fields</code> key of the page editor. The schema will be used as a component.<br>If supplied will act as the source of the field schema and replace the components default fields if there are any.</td>
</tr>
<tr>
<td><em><code>schema</code></em></td>
<td>object</td>
<td>All schema keys can be accessed from within the component as <code>schema.myTitle</code> This allows you to pass data dynamically into the component</td>
</tr>
<tr>
<td><code>html</code></td>
<td>string</td>
<td>Contains HTML to be rendered as a component.</td>
</tr>
<tr>
<td><code>&#x3C;bfcomp></code></td>
<td></td>
<td>HTML tag name needed to identify a BF component</td>
</tr>
<tr>
<td>name</td>
<td>string</td>
<td>The component name</td>
</tr>
<tr>
<td><code>modelSource</code></td>
<td>object</td>
<td>used to supply the model will be for this component, in not supplied, the current model for the element is used.</td>
</tr>
<tr>
<td><code>modelDev</code></td>
<td>object</td>
<td>Optional. Used to add model keys that can be used for development and tests of components rendered where there is no <code>model</code> available. ( Used by the BF editor )</td>
</tr>
<tr>
<td><code>source</code></td>
<td>{ component }</td>
<td>If supplied, this will act as the entire source for the component. This attribute was added to allow the BF component editor to preview live components. You probably will never use this key. component is a complete component object (not documented in this doc, see support if needed)</td>
</tr>
<tr>
<td><em><code>attributes</code></em></td>
<td>various</td>
<td>All additional attributes supplied will override the component's schema keys where applicable.<br>You can add any additional attribute or 'props' you need. Eg: <code>buttonLabel</code></td>
</tr>
</tbody>
</table>

#### Usage as an JSON Schema element

```json
{
    "name": "MyComponentName",
    "styleClasses": "",
    "type": "bfcomponent"
}
```

#### Usage as an HTML Vue component

```markup
<bfcomp name="MyComponent" modelSource="model"   ></bfcomp>
```

#### Inline example: calling a component-scoped action

```html
<!-- Inside MyComponent's HTML/template -->
<button @click="namedAction('comp_save', { source: 'cta' })">Save</button>
```

### Context

Components mostly act the same as any other BF element for context. They see `model` and `app` the same regardless of HTML or BF JSON element schema. 

## Component-Scoped Named Actions

This note focuses on component-internal named actions: defining actions on components, how resolution works inside `bfcomponent` templates, and the `onMount` lifecycle behavior (v3.2.18+ Beta).

#### Prerequisite: Custom Components as Schema or HTML/Vue
See usage patterns and `<bfcomp>` embedding below:
[Usage as an HTML Vue component](#usage-as-an-html-vue-component)

---

## Named actions overview
For a full introduction to named actions (definition, execution contexts, and general examples), see:

{% content-ref url="../../../reference/actions-processor/actions_named.md" %}
[actions_named.md](../../../reference/actions-processor/actions_named.md)
{% endcontent-ref %}

---

## Component‑internal named actions and lifecycle (v3.2.18+ Beta)

This section documents how named actions defined on custom components are resolved and how the `onMount` lifecycle named action works.

### Where to define component named actions

You can define named actions directly on the component definition. Both locations below are supported when resolving from a component template:

```json
{
  "html": "<button @click=\"namedAction('comp_hello')\">Hello</button>",
  "namedActions": {
    "comp_hello": [{ "action": "showAlert", "options": { "message": "Hi" } }],
    "onMount": [{ "action": "log", "options": { "message": "mounted" } }]
  }
}
```

or nested under `comp`:

```json
{
  "comp": {
    "namedActions": {
      "comp_hello": [{ "action": "showAlert", "options": { "message": "Hi" } }],
      "onMount": [{ "action": "log", "options": { "message": "mounted" } }]
    }
  }
}
```

### How resolution works inside component templates

When a template rendered inside a `bfcomponent` calls `namedAction('some_name')`, the runtime resolves the chain in this order:

- 1) `form.namedActions[some_name]` (form‑level overrides)
- 2) Component definitions in site content and site root:
  - `component.namedActions[some_name]`
  - `component.comp.namedActions[some_name]`

This means a form can intentionally override a component's action by using the same name at form scope.

### Lifecycle: `onMount`

- `bfcomponent` instances look for `namedActions.onMount` on the instance (`this.comp.namedActions.onMount`) and, if not found, on the component definition (`def.namedActions.onMount`).
- If present, the action(s) are queued once per component instance during Vue `mounted()`.
- The runtime clones the steps and injects a unique `idThread` for correlation.

Notes:
- `onMount` is not global; each instance evaluates it. If you place two instances of the same component on a page, both will attempt to run `onMount` unless you guard it yourself (see next section).
- Prefer making `onMount` idempotent.

---

## Best practices

- **Naming to avoid collisions**: Prefix internal named actions with a short component prefix to reduce collisions with form/global actions, e.g., `uppy_fileUpload`, `chat_sendMessage`.
- **Keep names stable**: If your component is referenced externally (schema or tools), treat internal action names as API.
- **Propagate options**: Make sure options passed at call sites flow to the chain; avoid overwriting `action.options` in custom function steps.

### Single Uppy instance (global)

Uppy should be initialized once globally. Guard at the start of `onMount` so subsequent component instances no‑op.

### Global singleton guard (recommended)

Put a single `function` action first in `onMount` and short‑circuit if already initialized.

```javascript
window.__bfSingletons = window.__bfSingletons || {};
const k = 'uppy';
if (window.__bfSingletons[k]) return;
window.__bfSingletons[k] = true;
```

Choose a stable key (`k`) per feature you initialize.

### Make the rest of `onMount` idempotent

- Check for existing global objects or listeners before creating new ones (e.g., `if (window.uppy) return;`).
- Avoid attaching duplicate event handlers; if needed, track a flag (`window.__bfHandlers.uploaderReady = true`).

### Example: Single‑instance Uppy (JS)

```javascript
// Guard: only one global Uppy
window.__bfSingletons = window.__bfSingletons || {};
if (window.__bfSingletons.uppy) return;
window.__bfSingletons.uppy = true;

// Hidden host once
if (!document.getElementById('bf-fileinput-host')) {
  var host = document.createElement('div');
  host.id = 'bf-fileinput-host';
  host.style.position = 'fixed';
  host.style.left = '-9999px';
  host.style.top = '0';
  document.body.appendChild(host);
}

// Initialize Uppy once
window.uppy = new Uppy.Uppy({ autoProceed: true, debug: false })
  .use(Uppy.AwsS3, { /* getUploadParameters, etc. */ })
  .use(Uppy.FileInput, { id: 'BFFileInput', target: '#bf-fileinput-host', pretty: false });
```

---

## Instance‑specific arguments pattern (recap)

When a component instance needs to pass per‑instance values (like `modelPath`, `accept`, or `apiKey`) into a named action, pass them directly via the call from the template. The options object propagates through the chain.

Example (inside component HTML):

```html
<button @click="namedAction('onfileAdded', { docType: 'photo', accept: 'image/*', multiple: false, modelPath: schema.model })">Select File</button>
```

In your action step, read them from `action.options`:

```json
{ "action": "function", "function": "var ctx = action.options || {}; /* use ctx.docType, ctx.accept, ctx.modelPath */" }
```

This avoids per‑instance registration in the global store while keeping actions reusable.

---

## Gotchas and best practices

- **Keep names stable**: Treat named action names as API. UI tools may reference them; avoid breaking renames.
- **Do not drop `toolCallId`**: If you manually construct intermediate actions, ensure the `options` object is preserved so `llmToolCallResponse` can read `toolCallId`.
- **Use small, composable chains**: Prefer short, reusable named actions and compose with additional schema actions when needed.

## Best Practices

### Sizing and Styling

Generally, it should be the implementation of the component that is responsible for the component's size.  There are some exceptions. This means that the width of your component is generally full width and the parent or 'implementor' of the component will control the width. 

Examples:

| Component Type        | Size controller      | Comments                                                                                                                               |
| --------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Page Header Component | implementation       | this allows the header                                                                                                                 |
| Button Component      | Defined in component | Buttons generally don't take on the shape of the parent elements. When you need to override a button's width, you can pass in a class. |
|                       |                      |                                                                                                                                        |











