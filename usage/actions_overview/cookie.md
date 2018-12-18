# cookie

Allows client browser cookie setting \(and getting\).

To remove a cookie simply set the  `daysOrOptions` value to `0`

\`\`

| Key | Type | Description |
| :--- | :--- | :--- |
| action | string | `cookie` Action name |
| action.options.action | string | Options: `set`  and `remove` The cookie action to perform. For `get` support see exampels below |
| action.options.daysOrOptions | number or sobject | If number, the number of days before the cookie expires, If object see additional notes |
| action.options.name | string | Cookie name |
| action.options.value | string | Cookie value |

`cookie` action is based on `vue-js-Cookie` and `js-cookie`

**Notes** `options.daysOrOptions` can take an number or an object.

**Examples**

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
Vue.$cookie.set('cookieName', 'some info here', 7)
Vue.$cookie.getJSON('cookieName') returns JSON obj of cookie data

// Setting a cookie from a click within a HTML 
... @click="Vue.cookie.set('myCookieName', 4") ...
```

**Custom Function** There is no CF avail at this time.

#### Additional Reference:

[https://github.com/BlueBayTravel/vue-js-cookie](https://github.com/BlueBayTravel/vue-js-cookie)

 [https://github.com/js-cookie/js-cookie/](https://github.com/js-cookie/js-cookie/)

