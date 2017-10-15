# Actions Processor

The actions processor allows you to create interactions with the user. The actions object is an array. Actions are executed sequentially. Modal actions what until the modal is closed. 

### Action Types:

* _**showModal**_** **- Renders a modal dialog

* _**showAlert**_** **- Renders a toaster style alert

* _**path **_**- **redirects the user to a new page** **

* _**downloadFile**_** **- downloads a file (link) to the user 

### Usage
Actions can be injected the following places:
* All hooks 
* Navigation Menu Items
* Form action elements


### _$actions_ - Actions Array

The `$actions` JSON array is surfaced in many of the developer hooks that are applicable to rendering actions.

Actions are executed sequentially starting at `index = 0`

You should always have a `"action": "path"` when you are adding actions to the `onLogin` developer hook. If you do not, the user will be stuck at the login prompt page.

#
Action Options

#### action: showModal

| Key | Description |
| :--- | :--- |
| action | showModal |
| options.text | |
| options.some stuff | |
| options. | |
| options. | |
| options. | |

```
// action object for 'showModal'
{

}
```




