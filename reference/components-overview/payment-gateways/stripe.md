# Stripe

The `Stripe` component allows you to securely process payments via Stripe. This component only renders the button and handles the secure transaction via the Stripe API. You will need to add summary information around this component so the user knows what they are paying for.

This element is an implementation of the Stripe Checkout integration.

When clicked, the payment workflow is initiated.

#### Key Properties

| Key                | Value(s) | Type   | Description                                                                            |
| ------------------ | -------- | ------ | -------------------------------------------------------------------------------------- |
| type               | stripe   | string | Identifies the type of payment processor being used.                                   |
| model              |          | object | Data model key name that will contain results of payment transactions.                 |
| product            |          | object | Contains details about the product being purchased.                                    |
| currency           |          | string | The currency for the payment (e.g., `USD`).                                            |
| onSuccess\_actions |          | array  | Actions to run when the payment is successfully processed.                             |
| button             |          | string | Text to be displayed on the payment button.                                            |
| buttonClass        |          | string | CSS classes to style the button.                                                       |
| formId             |          | string | The ID of the form element containing the button.                                      |
| apiKey             |          | string | Your Stripe API key. Use your test key in development and your live key in production. |
| styleClasses       |          | string | CSS classes to style the component.                                                    |
| options            |          | object | Additional configuration options for the Stripe integration.                           |

#### Example Usage

```
{
  "options": {},
  "apiKey": "pk_test_goJPTw3PtFPLN6F0pD9GMUvI",
  "button": "Buy Now",
  "onSuccess_actions": [],
  "buttonClass": "btn btn-primary",
  "formId": "myButton1",
  "model": "stripeResponse",
  "product": {
    "amount": 100,
    "description": "562 pages hard cover book.",
    "name": "Acme Corporation"
  },
  "styleClasses": "col-lg-3",
  "type": "stripe"
}
```
