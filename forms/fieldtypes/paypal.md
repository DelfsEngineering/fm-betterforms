## paypal - Paypal Payment button and processor

`paypal` Allows you to securly process payments via PayPal. This component only redners the button and hands the secur transaction via the PayPal API.

This element in an implementation of [vue-paypal-checkout](https://github.com/khoanguyen96/vue-paypal-checkout)

![](/assets/Screen Shot 2017-11-10 at 1.12.57 PM.png)

When clicked, the payment workflow is initiated.

| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | paypal | string |  |
| model |  | object | contains results of payment tansactions |
| amount |  |string|model key that holds the amount|
| invoiceNumber | 'nyInvNo' |string|model key that holds invoice number|
| items | 'myItems' |array|model key that holds an array of items|
| credentials |{}|d |credential object, |
| style |{}|object |PayPal defined styling of the button|

##### 


##### Reference

```
// sample credential object
credentials: {
    sandbox: '<sandbox client id>',
    production: '<production client id>'
  }
```

```
// Sample Items Object
myItems: [
    {
      "name": "hat",
      "description": "Brown hat.",
      "quantity": "1",
      "price": "5",
      "currency": "USD"
      },
      {
      "name": "handbag",
      "description": "Black handbag.",
      "quantity": "1",
      "price": "5",
      "currency": "USD"
      }
  ]
```


