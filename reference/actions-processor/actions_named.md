# Named Actions (Action Scripts)

Named actions are reusable action arrays. They are the closest BetterForms equivalent to a FileMaker script name plus script steps.

## Defining Named Actions

* `formSchema.form.namedActions` are scoped to the current page. In the IDE, define these in the **Scripts** tab for the page.
* `site.content.namedActions` are globally scoped and can be called from anywhere in the app.

### Execution

Named actions can be executed from several contexts.

<table><thead><tr><th width="134.33333333333331">Context</th><th width="414">Syntax eg</th><th></th></tr></thead><tbody><tr><td>[actions array]</td><td><p><code>"xxx_actions" : [</code></p><p>    <code>{ your namedActions}</code></p><p><code>]</code></p></td><td>A named action is just an action that calls other named Action scripts.</td></tr><tr><td>HTML</td><td><code>&#x3C;button @click="namedAction('saveData',{person: model.person})"> ... &#x3C;/button></code></td><td>Calling from from HTML you can use the method <code>namedAction</code></td></tr><tr><td>JavaScript</td><td><code>BF.namedAction('saveData',{person: model.person})</code></td><td>When calling from JS, use the <a href="../bf-utility-function-ver-0.9.20+.md">BF functions</a> library.</td></tr></tbody></table>

### Lookup Order

When BetterForms processes a `namedAction`, it resolves the name in this order:

1. the active page/window `form.namedActions`
2. `site.content.namedActions`
3. registered component-scoped named actions
4. legacy `processNamedAction` event-bus listeners, if no named action was found

This means page-level named actions override app-level ones of the same name.

### Schema

Named actions look like any other actions array, with just the name of the action as the key. They can either be a single action like the `showCantDoThat` example, or an array of actions like `goToMyAccount`.



```yaml
"namedActions": {
    "showCantDoThat": {
        "action": "showAlert",
        "options": {
            "title": "Whoooaa!!",
            "text": "You can't do that thing you just did.",
            "type": "warning"
        }
    },
    "goToMyAccount": [{
        "action": "path",
        "options": {
            "path": "/account"
        }
    }]
}
```

### Reserved Names (> v0.8.13)

Some names are used by built-in client workflows.

These reserved names are part of the **client-side lifecycle / workflow system**. They are not the same thing as FileMaker server hooks.

| Reserved name | Scope | What it does |
| --- | --- | --- |
| `onFormLoad` | Page-level named action | Runs just after a form/page is loaded in the browser |
| `onAppLoad` | App-level named action | Runs just after the app/site is loaded |
| `onLogin` | App-level named action | Runs after the user is authenticated on the client |
| `appIsOnline` | App-level named action | Runs when BetterForms detects the app has come back online |
| `appIsOffline` | App-level named action | Runs when BetterForms detects the app has gone offline |

### onFormLoad

`onFormLoad` runs after the page/form has loaded.

- Define it on the page's `form.namedActions`
- If actions were generated in an `onFormRequest` hook, those actions are queued before `onFormLoad`
- A common pattern is to render the page, then run follow-up browser actions or a `runUtilityHook`

### onAppLoad

`onAppLoad` runs after the app/site loads in the browser.

- Define it in app-level named actions
- Use it for app-wide startup work such as populating browser-side flags, loading libraries, or setting up PWA behavior
- BetterForms can skip it when the `_onAppLoad=0` query parameter is present

### onLogin

`onLogin` is a client-side named action that runs after the user authenticates.

- Define it in app-level named actions
- Use it for post-login client workflows such as populating client-side state or running follow-up UI actions
- This is separate from the FileMaker `onLogin` **server hook**

The normal login flow can involve both:

1. BetterForms authenticates the user.
2. BetterForms runs the FileMaker `onLogin` server hook.
3. BetterForms can also run the client-side named action `site.content.namedActions.onLogin`.

### appIsOnline / appIsOffline

These app-level named actions are triggered when BetterForms detects an online/offline status change in the browser.

- Define them in app-level named actions
- Use them for reconnect UX, retry messaging, or online/offline banners
- They are browser-state workflows, not FileMaker hooks

For the broader distinction between lifecycle hooks and FileMaker hooks, see [Lifecycle Hooks](../hooksoverview/lifecycle-hooks.md) and [Common Hooks](../hooksoverview/commonoverview.md).

## Usage

As an action in a standard array of actions:

```yaml
{
    "action": "namedAction",
    "name": "showCantDoThat", //the name your named action
    
    //all options set here are merged into the options of the named actions
    "options": {
        "id": "12345" 
    }
}
```

In an HTML element using `@click`:

```markup
// Shows a button that triggers a namedAction called goToMyAccount
<button @click="namedAction('goToMyAccount',{id: '12345'})"  type="button">
     <i class="icon-user"></i> Show Account
</button>
```

In this example, `goToMyAccount` is the name of the named action and the `{id: '12345'}` is the options array that will be passed to the named action. In JavaScript, JSON keys do not need to be in quotes.

#### Sequence

If a namedAction is called while other actions are still in the queue, the namedAction will run first and get inserted at the front of the actions queue. You can think of this as a sub-script where the namedAction runs first and then the remaining actions continue. This allows you to reuse code and is particularly useful in the global scope.

If a name is not found in page, site, or registered component actions, BetterForms falls back to the legacy `processNamedAction` event-bus path for older component listeners.

---

## See Also

- **[Lifecycle Hooks](../hooksoverview/lifecycle-hooks.md)** - Reference for `onAppLoad`, `onFormLoad`, and component lifecycle named actions
- **[Common Hooks](../hooksoverview/commonoverview.md)** - Reference for FileMaker server hooks such as `onLogin`
- **[Creating Components with Third-Party Libraries](../../guides/integrations/creating-components-with-third-party-libraries.md)** - Learn how to use named actions in component lifecycle hooks (onBeforeMount, onMount, etc.) to integrate JavaScript libraries
- **[BF.libraryLoadOnce()](../bf-dynamic-library-loading.md)** - Dynamic library loading utility for use in function actions
- **[Component Best Practices](../../guides/styling/custom-components/component-best-practices.md)** - Guidelines for creating custom components
