# Named Actions
Named actions are predefined actions that can be called from events like HTML onClick etc. These actions consist of the same action parameters as regular actions but have a unique name associated with each one. namedActions support the  `function` key.

### Places Supporting Named Actions
* `formSchema.form.namedActions` These are scoped to the form (page) that is current
* `site.content.namedActions` These are globally scoped and can be called from anywhere.

#### Priority of Execution
* The actions processor will first try to find the named action in the current form, . If unsuccessful, the global `site.namedActions` object is checked.

### namedActions Schema

```
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

### Usage
In an HTML element type you can call the named action as follows:
```
// Shows a bootstrap alert


```



