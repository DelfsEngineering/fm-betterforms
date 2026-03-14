# showStripeCheckout

Triggers a Stripe checkout flow for an existing Stripe component on the page.

This action does not define the Stripe product, API key, or success handling by itself. Those values belong on the Stripe component schema.

## Action Object

| Key | Type | Description |
| --- | --- | --- |
| `action` | `string` | Must be `"showStripeCheckout"` |
| `options.formId` | `string` | Required Stripe component `formId` to trigger |

## Example

```json
{
  "action": "showStripeCheckout",
  "options": {
    "formId": "checkoutMain"
  }
}
```

## Behavior Notes

- BetterForms emits a Stripe checkout event using the supplied `formId`.
- The matching Stripe component receives that event and opens the checkout flow.
- Success handling is configured on the Stripe component schema with `onSuccess`, not on the action object.
- If no matching Stripe component is configured, the action has nothing to trigger.

## Related Pages

- [Stripe](../../components-overview/payment-gateways/stripe.md)