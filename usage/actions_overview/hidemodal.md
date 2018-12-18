# hideModal

Displays a full screen modal dialogue.

| Key | Description |
| :--- | :--- |
| action | hideModal |

showAlert supports additional parameters and slots! **reference:** [http://sweet-modal-vue.adepto.as](http://sweet-modal-vue.adepto.as)

```text
// action  object for 'showModal'
{

}
```

## FileMaker Custom Function

There is no FM CF for this action. Use the `BF_SetAction` custom function as shown.

```text
Set Variable $$BF_Actions = BF_SetAction( "hideModal" ; "" )
```



