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

Both the BF JSON and the HTML API's are the same. Keys within the BF JSON schema can be references from within the component as \``` schema` ``



### **Component API**

<table><thead><tr><th width="165">Key</th><th width="145.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>fields</code></td><td>array</td><td>Optional either <code>html</code> or <code>fields</code> keys must be present. Contains BF schema elements normally found in the <code>fields</code> key of the page editor. The schema will be used as a component.<br>If supplied will act as the source of the field schema and replace the components default fields if there are any. </td></tr><tr><td><em><code>schema</code></em></td><td>object</td><td>All schema keys can be accessed from within the component as <code>schema.myTitle</code> This allows you to pass data dynamically into the component</td></tr><tr><td><code>html</code></td><td>string</td><td>Contains HTML to be rendered as a component.</td></tr><tr><td><code>&#x3C;bfcomp></code></td><td></td><td>HTML tag name needed to identify a BF component</td></tr><tr><td>name</td><td>string</td><td>The component name</td></tr><tr><td><code>modelSource</code></td><td>object</td><td>used to supply the model will be for this component, in not supplied, the current model for the element is used.</td></tr><tr><td><code>modelDev</code></td><td>object</td><td>Optional. Used to add model keys that can be used for development and tests of components rendered where there is no <code>model</code> available. ( Used by the BF editor )</td></tr><tr><td><code>source</code></td><td>{ component }</td><td>If supplied, this will act as the entire source for the component. This attribute was added to allow the BF component editor to preview live components. You probably will never use this key. component is a complete component object (not documented in this doc, see support if needed)</td></tr><tr><td><em><code>attributes</code></em></td><td>various</td><td>All additional attributes supplied will override the component's schema keys where applicable.<br>You can add any additional attribute or 'props' you need. Eg: <code>buttonLabel</code></td></tr><tr><td></td><td></td><td></td></tr></tbody></table>

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

Components mostly act the same as any other BF element for context. They see `model` and `app` the same regardless of HTML or BF JSON Elelement schema. 

## Component‑internal named actions (v3.2.18+ Beta)

You can define internal named actions on a custom component and trigger them from inside the component’s HTML/Vue template.

### Where to define

Both locations are supported at runtime:

Top‑level on the component:

```json
{
  "html": "<button @click=\"namedAction('comp_hello')\">Hello</button>",
  "namedActions": {
    "comp_hello": [{ "action": "showAlert", "options": { "message": "Hi" } }],
    "onMount": [{ "action": "log", "options": { "message": "mounted" } }]
  }
}
```

Nested under `comp`:

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

### Triggering from a component template

Inside your component HTML/Vue, call `namedAction('name', options)`.

Resolution order:

1) `form.namedActions[name]` (form‑level override if present)
2) Component definition:
   - `component.namedActions[name]`
   - `component.comp.namedActions[name]`

This allows a form to intentionally override a component action by name if needed.

### Lifecycle: `onMount`

If `onMount` is defined (top‑level or under `comp.namedActions`), it is queued once when each component instance mounts. If you place multiple instances of the same component on a page, each instance will evaluate `onMount` — use a guard for singletons.

### Pass per‑instance options

For instance‑specific values, pass options directly from the template; they propagate through the chain:

```html
<button @click="namedAction('onfileAdded', { docType: 'photo', accept: 'image/*', multiple: false, modelPath: schema.model })">Select File</button>
```

In a function step, read them via `action.options`.

### Best practices

- Naming: Prefix internal actions to avoid collisions (e.g., `uppy_fileUpload`, `chat_sendMessage`).
- Stability: If referenced externally (from schema or tools), treat names as API.
- Idempotency: Prefer `onMount` that can safely run multiple times if needed.

Single Uppy instance (global):

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

## Best Practices

### Sizing and Styling

Generally, it should be the implementation of the component that is responsible for the component's size.  There are some exceptions. This means that the width of your component is generally full width and the parent or 'implementor' of the component will control the width. 

Examples:

| Component Type        | Size controller      | Comments                                                                                                                               |
| --------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Page Header Component | implementation       | this allows the header                                                                                                                 |
| Button Component      | Defined in component | Buttons generally don't take on the shapre of the parent elements. When you need to override a buttons width, you can pass in a class. |
|                       |                      |                                                                                                                                        |











