# Named Actions

Named actions are predefined actions that can be called from events like HTML onClick etc. These actions consist of the same action parameters as regular actions but have a unique name associated with each one. namedActions support the `function` key.

## Places Supporting Named Actions

* `formSchema.form.namedActions` These are scoped to the form \(page\) that is current
* `site.content.namedActions` These are globally scoped and can be called from anywhere.

## Priority of Execution

* The actions processor will first try to find the named action in the current form. If unsuccessful, the global `site.namedActions` object is checked.

## Reserved Names \( &gt; v0.8.13\)

There are some reserved named action key names that are reserved for special use cases.

**onFormLoad** - When in the form scoped named actions array, these actions will run just after a form is loaded. If there are actions that are generated in an `onFormRequest` hook, those actions will be queued first and the `onFormLoad` actions will run after. A typical use case would be to show an empty form with a loading placeholder image, then request data from the server then render the data after, allowing the application to feel more performant.

**onAppLoad** - When use in the site scoped named actions array, these actions will run just after the app is loaded. This can be used to populate global app settings like user data and flags after a page is refreshed.

## namedActions Schema

```yaml
[
    "namedActions": {
        "showCantDoThat": {
            "action": "showAlert",
                "options": {
                    "title": "Whoooaa!!",
                    "text": "You can't do that thing you just did.",
                    "type": "warning"
                }
            }
        }
]
```

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

In an HTML element you can call the named action as follows:

```markup
// Shows a button that triggers a namedAction called gotoMyAccount
<button @click="namedAction('gotoMyAccount',{})"  type="button">
     <i class="icon-user"></i>
     Show Account
</button>
```

I

