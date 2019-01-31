# authorize

{% hint style="danger" %}
#### This component documentation is work in progress
{% endhint %}

`authorize` Allows you to securely process payments via Authorize.net This component only renders the button and hands the secure transaction via Authorize.net's accept.js module. The workflow for this component requires a bit more work than the Stripe or PayPal payment gateways. Unlike those elements, `authorize` requires server side calls the the Authorize.net API to complete the transaction.

See [https://developer.authorize.net/api/reference/features/acceptjs.html](https://developer.authorize.net/api/reference/features/acceptjs.html) for workflow reference and deeper understanding of this component.

When the rendered button is clicked, a modal window is opened that will contain card capture information. This window is an iFrame and generated securely via the accept.js model. Once the payment information has been entered,



| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | authorize | string |  |
| model |  | object | data model key name that will contain results of payment transactions returned from Authorize.net |
| credentials | {} | object | credential object, |
| style | {} | object | PayPal defined styling of the button |

For more information, PayPal Item List

```yaml
// Sample 

```

```javascript

```

### 

