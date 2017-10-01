# Action Options

#### action: showModal

Displays a full screen modal dialogue. 

| Key | Description |
| :--- | :--- |
| action | showModal |
| options.text |  |
| options.some stuff |  |
| options. |  |
| options. |  |
| options. |  |

```
// action  object for 'showModal'
{

}
```

#### 
#### action: path

Redirects the user to a new path \(layout or form etc within the app\)

note: _path_ must be last item \( processor does not check for subsequent ones after path \)

| Key | Description |
| :--- | :--- |
| action | showModal |
| options.path | "/" - index page |
| | "/form/:id - a form with id |
| | |
| | |
| | |
| | |

```
// action object
```
#### action: showAlert

Displays a 'toaster style' notification to the user. 

source code reference: [vue-notification](https://github.com/euvl/vue-notification)

All props are optional.

| Name           | Type    | Default      | Description |
| ---           | ---     | ---          | ---         |
| group          | String  | null         | Name of the notification holder, if specified |
| width          | Number/String  | 300          | Width of notification holder, can be `%`, `px` string or number.<br>Valid values: '100%', '200px', 200 |
| classes        | String/Array | 'vue-notification' | List of classes that will be applied to notification element |
| position       | String/Array | 'top right'  | Part of the screen where notifications will pop out |
| animation-type | String  | 'css'      | Type of animation, currently supported types are `css` and `velocity` |
| animation-name | String  | null       | Animation name required for `css` animation |
| animation      | Object  | `$`*         | Animation configuration for `Velocity` animation |
| duration       | Number  | 3000         | Time (ms) animation stays visible (if **negative** - notification will stay **forever** or until clicked) |
| speed          | Number  | 300          | Speed of animation showing/hiding |
| max            | Number  | Infinity     | Maximum number of notifications that can be shown in notification holder |
| reverse        | Boolean | false        | Show notifications in reverse order |


| Key | Description |
| :--- | :--- |
| action | showAlert |
| options.title | The title of the alert |
| | "/form/:id - a form with id |
| | |
| | |
| | |
| | |





