# Authorize.net

`authorize` Allows you to securely process payments via Authorize.net This component only renders the button and hands the secure transaction via Authorize.net's accept.js module. The workflow for this component requires a bit more work than the Stripe or PayPal payment gateways. Unlike those elements, `authorize` requires server side calls the the Authorize.net API to complete the transaction.

**Version:** &gt;0.8.16

{% hint style="danger" %}
#### This component documentation is work in progress
{% endhint %}

See [https://developer.authorize.net/api/reference/features/acceptjs.html](https://developer.authorize.net/api/reference/features/acceptjs.html) for workflow reference and deeper understanding of this component.

When the rendered button is clicked, a modal window is opened that will contain card capture information. This window is an iFrame and generated securely via the accept.js model. Once the payment information has been entered,

#### Credentials

You will need to obtain server sets of credentials from the authorize.net dashboard. See screen below for where to obtain the public `apiLoginID` and `clientID`  keys.





| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| `type` | authorize | string |  |
| `model` |  | object | data model key name that will contain results of payment transactions returned from Authorize.net |
| `credentials` | {} | object | credential object, |
| `style` | {} | object | PayPal defined styling of the button |

```javascript
// Sample schema object
{
  "model": "authorize",
  "styleClasses": "col-md-4",
  "type": "authorize",
  "acceptUIFormBtnTxt": "Complete Payment",
  "acceptUIFormHeaderTxt": "Card Payment Information",
  "apiLoginID": "9vR4pUBE483",  
  "billingAddressOptions": {
    "required": true,
    "show": true
  },
  "buttonClasses": "btn btn-lg btn-primary",
  "buttonText": "Pay Now",
  "clientKey": "7amDN97QG6xkHGB4xdD2yd3BYvdZ49HFjp7j7477U282BYuwuheDMvk4zE2R44b8",
  "sandBox": true
}

```

#### Response Hook

After the communication between the BetterForms browser app and Authorize.net api, a utility hook is automatically generated regardless if the card acquisition was successful. This is located in the hookPackage and also includes the elements schema. 

```text
// Partial utility hook response 
{ 
... // rest of payload ...
  "hookPackage": {
    "response": {
      "customerInformation": {
        "firstName": "Adf",
        "lastName": "Asdf"
      },
      "encryptedCardData": {
        "bin": "424242",
        "cardNumber": "XXXXXXXXXXXX4242",
        "expDate": "02/21"
      },
      "messages": {
        "message": [
          {
            "code": "I_WC_01",
            "text": "Successful."
          }
        ],
        "resultCode": "Ok"
      },
      "opaqueData": {
        "dataDescriptor": "COMMON.ACCEPT.INAPP.PAYMENT",
        "dataValue": "eyJjb2RlIjoiNTBfMl8wNjAwMDUzMEQ1OUEyRTREREEwODM3RTJGOURENDVEOTI5NjdGRjRENzQ4MUExQzRDQ0VFNTE3Q0U4MTRBQjRENUYyOEFGDFgwMjYyNTNBRERDNEYyM0QzQkY1MjJADSaSdfasDfsdfOiI5NTQ3NDcyNDEyNzQ2MjQ5MTAzNTAyIiwidiI6IjEuMSJ9"
      }
    },
    "schema": {
      "acceptUIFormBtnTxt": "Complete Payment",
      "acceptUIFormHeaderTxt": "Card Payment Information",
      "apiLoginID": "9vR4pUBE483",
      "billingAddressOptions": {
        "required": true,
        "show": true
      },
      "buttonClasses": "btn btn-lg btn-primary",
      "buttonText": "Pay Now",
      "clientKey": "7amDN97QG6xkHGB4xdD2yd3BYvdZDfGHJjY55F77U282BYuwmb%Cvk4zE2R44b8",
      "model": "authorize",
      "sandBox": true,
      "styleClasses": "col-lg-4 col-md-4 ",
      "type": "authorize"
    },
    "type": "authorize"
  }
}
... // rest of payload ...
```

