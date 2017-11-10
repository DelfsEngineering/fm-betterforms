## paypal - Paypal Payment button and processor

`paypal` Allows you to securly process payments via PayPal. This component only redners the button and hands the secur transaction via the PayPal API.

This element in an implementation of [vue-paypal-checkout](https://github.com/khoanguyen96/vue-paypal-checkout)

![](/assets/Screen Shot 2017-11-10 at 1.12.57 PM.png)

When clicked, the payment workflow is initiated.

| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | paypal | string |  |
| model |  | object | contains results of payment tansactions |
| credentials |{}|d ||
| options | { ... } | object | Paypal Required settings |

##### 


##### Example

```
// you can use either body or model or both keys for HTML source code

{
  "html": "<h1>This is some HTML</h1> It will display ahead of the model HTML",
  "model": "mySourceHtml",
  "type": "html"
},


```

