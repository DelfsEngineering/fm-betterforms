# Action: showAlert

Displays a full screen modal dialogue.

| Key | Description |
| :--- | :--- |
| action | showModal |
| options.text | Body text for alert |
| options.title | Title text |
| options.type | info \| warn \| error \| success |
| options.options | object - additional options to the parent options |

showAlert supports additional parameters  
**reference:**[ https://github.com/euvl/vue-notification/blob/master/README.md](https://github.com/euvl/vue-notification/blob/master/README.md)

```
// action  object for 'showModal'
{

}
```

#### FileMaker Custom Function

This CF allows for super easy implementation. Pass additional options in the options object if needed.

```
// V1
BF_SetAction_showAlert( title ; type ; text ; options ) 
or 
// V2
BF_SetAction_showAlert_g
```



