---
description: Requests push-notification permission and registers the browser subscription with BetterForms.
---

# pwaPromptPushPermission

`pwaPromptPushPermission` asks the browser for push-notification permission and, when permission is granted, creates or reuses a push subscription and registers it with BetterForms.

## Action Object

| Key | Type | Description |
| --- | --- | --- |
| `action` | `string` | Must be `"pwaPromptPushPermission"` |
| `options` | `object` | Optional metadata sent with the push subscription registration |

## Example

```json
{
  "action": "pwaPromptPushPermission",
  "options": {
    "idUser": "BF_USER_ID"
  }
}
```

## Behavior Notes

- Requires browser support for both `Notification` and `PushManager`.
- BetterForms requests notification permission from the browser.
- If permission is granted, BetterForms retrieves the VAPID public key from the server, subscribes the browser, and saves the subscription using `pushDataRegister`.
- If the browser does not support push notifications, BetterForms alerts the user.

## Related Pages

- [pwaPushNotificationSend](./pwapushnotificationsend.md)
- [Creating a PWA](../../guides/integrations/creating-a-pwa.md)
