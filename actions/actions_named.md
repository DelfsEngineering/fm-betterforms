# Named Actions

Named actions are predefined actions that can be called from events like HTML onClick etc. These actions consist of the same action parameters as regular actions but have a unique name associated with each one.

The `form.namedActions` object can contain named actions.

```
// namedAction Schema
{
  "form": {

    ...

    "namedActions": {
      "showCantDoThat": {
        "action": "showAlert",
        "options": {
          "title": "Whoooaa!!",
          "text": "You can't do that thing you just did.",
          "type": "warning"
        }
      }
    },

   ...


  }
}
```

### Usage

in an HTML element type you can call the named action as follows:

```

```



