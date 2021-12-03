# cookie

Use cookies to set data in the user's browser that can persist between sessions. The `cookie` action allows for setting values into a cookie, and you can use a JavaScript function to retrieve the data back later.

Cookie values can also be retrieved in your FileMaker scripts. They are stored as a JSON object in the **\$$BF\_State** variable: `JSONGetElement ( $$BF_State ; "params.handshake.headers.cookie" )`

## Options

|     Options Key |        Type        | Description                                                                                     |
| --------------: | :----------------: | ----------------------------------------------------------------------------------------------- |
|        `action` |      _string_      | Options: `set`  and `remove` The cookie action to perform. For `get` support see examples below |
| `daysOrOptions` | _number or object_ | If number, the number of days before the cookie expires, If object see additional notes         |
|          `name` |      _string_      | Cookie name                                                                                     |
|         `value` |      _string_      | Cookie value                                                                                    |

To remove a cookie simply set the  `daysOrOptions` value to `0`

## **Examples**

```yaml
// action  object for 'cookie'
[
  {
    "action": "cookie",
    "options": {
      "action": "set",     // or get or remove
      "daysOrOptions": 1,
      "name": "MyCookieName",
      "value": "my cookie value"
    }
  }
]
```

```javascript
// As JS function 
Vue.cookie.set('cookieName', 'some info here', 7);
Vue.cookie.getJSON('cookieName'); // returns JSON obj of cookie data

// Setting a cookie from a click within a HTML 
... @click="Vue.cookie.set('myCookieName', 4)" ...
```

There is no built-in custom function at this time. If you want to set a cookie from a FileMaker script, use the BF\_SetAction\_Function action with the functions above.

{% hint style="warning" %}
Cookies that you set in a browser are will persist for every page in your site (until they expire) and are sent with every hook script back to your FileMaker server. Be careful not to store too much data in cookies as this can impact your site's performance.

For more on reducing the payload that is sent to your FileMaker server, see [this page](../../hooksoverview/env\_vars.md).
{% endhint %}

## Additional Reference:

This action is based on the following Vue modules:

{% embed url="https://github.com/BlueBayTravel/vue-js-cookie" %}

{% embed url="https://github.com/js-cookie/js-cookie/" %}

