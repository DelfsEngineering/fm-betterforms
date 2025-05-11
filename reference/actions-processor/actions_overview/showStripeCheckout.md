# showStripeCheckout

The `showStripeCheckout` action initiates the Stripe Checkout process. This action is often used internally by the Stripe component but can be called directly if needed for custom payment flows.

| Key             | Type     | Description                                                                      |
| :-------------- | :------- | :------------------------------------------------------------------------------- |
| `action`        | `string` | `"showStripeCheckout"`                                                             |
| `options`       | `object` | Contains the necessary parameters for Stripe Checkout (e.g., API key, product details, currency, etc.). These options typically mirror those used by the Stripe component. |

## Example Action Object

```yaml
{
  "action": "showStripeCheckout",
  "options": {
    "apiKey": "pk_test_YOUR_STRIPE_PUBLIC_KEY", // Replace with your actual public key
    "product": {
      "name": "My Product",
      "description": "Description of my product",
      "amount": 2000, // Amount in cents (e.g., $20.00)
      "currency": "usd"
    },
    "onSuccess_actions": [
      {
        "action": "showAlert",
        "options": {
          "title": "Payment Successful",
          "text": "Thank you for your purchase!",
          "type": "success"
        }
      }
    ]
    // ... other Stripe options as needed
  }
}
```

**Note:** For most use cases, it is recommended to use the dedicated [Stripe Component](../../components-overview/payment-gateways/stripe.md) which handles the presentation and invocation of the Stripe Checkout process. 