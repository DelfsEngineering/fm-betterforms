# Named Actions

Named actions are action arrays that can be referenced by more than one element, or more easily called from HTML elements. You can think of them like a script; give a name to a set of actions \(script steps\) and then call that named action from as many elements as you like.

## Defining Named Actions

* `formSchema.form.namedActions` These are scoped to the current page only. You can edit them in the **Misc** tab of the page editor.
* `site.content.namedActions` These are globally scoped and can be called from anywhere.

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

### Reserved Names \(&gt; v0.8.13\)

There are some reserved named action key names that are reserved for special use cases. 

**onFormLoad** - When in the form scoped named actions array, these actions will run just _after_ a form is loaded. If there are actions that are generated in an `onFormRequest` hook, those actions will be queued first and the `onFormLoad` actions will run after. A typical use case would be to show an empty form with a loading placeholder image, then request data from the server then render the data after, allowing the application to feel more performant.

**onAppLoad** - When use in the site scoped named actions array, these actions will run just after the app is loaded. This can be used to populate global app settings like user data and flags after a page is refreshed.

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

