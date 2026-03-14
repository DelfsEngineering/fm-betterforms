---
description: Sends a push notification through BetterForms to registered browser subscriptions.
---

# pwaPushNotificationSend

`pwaPushNotificationSend` sends a push notification through the BetterForms push-notification service.

## Action Object

| Key | Type | Description |
| --- | --- | --- |
| `action` | `string` | Must be `"pwaPushNotificationSend"` |
| `options` | `object` | Push-notification payload sent to the notification service |
| `options.actionButtons` | `array` | Optional action-button definitions that BetterForms remaps to `options.actions` before sending |

## Example

```json
{
  "action": "pwaPushNotificationSend",
  "options": {
    "title": "New Update",
    "body": "A new update is available.",
    "filter": {
      "users": ["BF_USER_ID"]
    }
  }
}
```

## Behavior Notes

- BetterForms sends this action to the `pushDataSendNotification` service.
- If `actionButtons` is present, BetterForms converts it into `actions` before sending the payload.
- The exact payload shape depends on the push-notification service configuration used by your app.

## Related Pages

- [pwaPromptPushPermission](./pwapromptpushpermission.md)
- [Creating a PWA](../../guides/integrations/creating-a-pwa.md)
