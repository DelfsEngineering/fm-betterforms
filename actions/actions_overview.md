# Actions Processor

The actions processor allows you to create interactions with the user.

### Types:

* _**showModal**_** **- Renders a modal dialoge

* _**path **_**- **redirects the user to a new page** **

### _$actions_ Actions Array

The `$actions` JSON array is surfaced in the developer hooks that are applicable to rendering actions.

Actions are executed sequentially starting at `index = 0`

You should always have a `"action": "path"` when you are adding actions to the `onLogin` developer hook. If you do not, the user will be stuck at the login prompt page. 

