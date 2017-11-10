## paypal - Paypal Payment button and processor

`paypal` Allows you to securly process payments via PayPal. This component only redners the button and hands the secur transaction via the PayPal API.
You will have to add summary information around this component so the user knows what they are paying for.

This element in an implementation of [vue-paypal-checkout](https://github.com/khoanguyen96/vue-paypal-checkout)

![](/assets/Screen Shot 2017-11-10 at 1.12.57 PM.png)

When clicked, the payment workflow is initiated.

| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | paypal | string |  |
| model |  | object | data model key name that will contain results of payment tansactions |
| amount |  |string|model key that holds the amount|
| invoiceNumber | 'myInvNo' |string|model key that holds invoice number|
| items | 'myItems' |array|optional - model key that holds an array of items|
| credentials |{}|object |credential object, |
| style |{}|object |PayPal defined styling of the button|

##### 


### Reference

```
// sample credential object
credentials: {
    sandbox: '<sandbox client id>',
    production: '<production client id>'
  }
```
####Specifying Items

Optionally, according to the PayPal Payments API documents, you can list out any items along with your transaction.

For more information, PayPal Item List

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

####Button Style

You can change the style of the button via a style object like so:
```
{
    label: 'checkout',
    size:  'responsive',    // small | medium | large | responsive
    shape: 'pill',         // pill | rect
    color: 'gold'         // gold | blue | silver | black
}
```


