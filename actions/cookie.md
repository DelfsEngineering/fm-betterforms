# Action: cookie

Allows client browser cookies setting (and getting)

| Key | Description |
| :--- | :--- |
| action | cookie |
| options.set | `string` The cookie action to perform |
| options.daysOrOptions | `number or object` - If number, the number of days before the cookie expires, If object see additional notes |
| options.name | `string` Cookie name |
| options.value | `string` Cookie value |

`cookie` action is based on `vue-js-Cookie` 
####Links
https://github.com/BlueBayTravel/vue-js-cookie
https://github.com/js-cookie/js-cookie/

**Notes**
`options.daysOrOptions` can take an object. See 

**Example**
```
// action  object for 'cookie'
[
  {
  "action": "cookie",
  "options": {
    "action": "set",
    "daysOrOptions": 1,
    "name": "MyCookieName",
    "value": "my cookie value"
  }
}
]
```

**Custom Function**
There is no CF avail at this time.