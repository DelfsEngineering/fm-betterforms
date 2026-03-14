# Named Actions (Action Scripts)

Named actions are action arrays ( Much like scripts in FileMaker) that can be referenced by more than one element, or more easily called from HTML elements. You can think of them like a FileMaker script. The set of actions has a name, like a script name.

## Defining Named Actions

* `formSchema.form.namedActions` These are scoped to the current page only. You can edit them in the **Misc** tab of the page editor.
* `site.content.namedActions` These are globally scoped and can be called from anywhere.

### Execution

Named actions can be executed from several contexts

<table><thead><tr><th width="134.33333333333331">Context</th><th width="414">Syntax eg</th><th></th></tr></thead><tbody><tr><td>[actions array]</td><td><p><code>"xxx_actions" : [</code></p><p>    <code>{ your namedActions}</code></p><p><code>]</code></p></td><td>A named action is just an action that calls other named Action scripts.</td></tr><tr><td>HTML</td><td><code>&#x3C;button @click="namedAction('saveData',{person: model.person})"> ... &#x3C;/button></code></td><td>Calling from from HTML you can use the method <code>namedAction</code></td></tr><tr><td>JavaScript</td><td><code>BF.namedAction('saveData',{person: model.person})</code></td><td>When calling from JS, use the <a href="../bf-utility-function-ver-0.9.20+.md">BF functions</a> library.</td></tr></tbody></table>

### Execution Order

The actions processor will first try to find the named action in the current page. If unsuccessful, the global `site.namedActions` object is checked.

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

There are some reserved named action key names that are reserved for special use cases.

These reserved names are part of the **client-side lifecycle / workflow system**. They are not the same thing as FileMaker server hooks.

| Reserved name | Scope | What it does |
| --- | --- | --- |
| `onFormLoad` | Page-level named action | Runs just after a form/page is loaded in the browser |
| `onAppLoad` | App-level named action | Runs just after the app/site is loaded |
| `onLogin` | App-level named action | Runs after the user is authenticated on the client |

### onFormLoad

`onFormLoad` runs after the page/form has loaded.

- Define it on the page's `form.namedActions`
- If actions were generated in an `onFormRequest` hook, those actions are queued before `onFormLoad`
- A common pattern is to render the page, then run follow-up browser actions or a `runUtilityHook`

### onAppLoad

`onAppLoad` runs after the app/site loads in the browser.

- Define it in app-level named actions
- Use it for app-wide startup work such as populating browser-side flags, loading libraries, or setting up PWA behavior

### onLogin

`onLogin` is a client-side named action that runs after the user authenticates.

- Define it in app-level named actions
- Use it for post-login client workflows such as populating client-side state or running follow-up UI actions
- This is separate from the FileMaker `onLogin` **server hook**

The normal login flow can involve both:

1. BetterForms authenticates the user.
2. BetterForms runs the FileMaker `onLogin` server hook.
3. BetterForms can also run the client-side named action `site.content.namedActions.onLogin`.

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

---

## See Also

- **[Lifecycle Hooks](../hooksoverview/lifecycle-hooks.md)** - Reference for `onAppLoad`, `onFormLoad`, and component lifecycle named actions
- **[Common Hooks](../hooksoverview/commonoverview.md)** - Reference for FileMaker server hooks such as `onLogin`
- **[Creating Components with Third-Party Libraries](../../guides/integrations/creating-components-with-third-party-libraries.md)** - Learn how to use named actions in component lifecycle hooks (onBeforeMount, onMount, etc.) to integrate JavaScript libraries
- **[BF.libraryLoadOnce()](../bf-dynamic-library-loading.md)** - Dynamic library loading utility for use in function actions
- **[Component Best Practices](../../guides/styling/custom-components/component-best-practices.md)** - Guidelines for creating custom components
