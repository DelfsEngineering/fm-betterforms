---
description: Using smart links (query tokens) and cookie-based sessions for streamlined authentication.
---

# Query & Cookie Based Auth

These are custom patterns for apps that need controlled access outside the built-in Basic Authentication and OAuth flows.

## Smart Links (Query Tokens)

Use time-bound tokens in the URL when you want a link itself to authorize the next step in a workflow.

Common use cases in BetterForms:

- Email verification links (`authVerify` reads token from the URL on the verification page)
- Password reset links
- Invitation or approval links that should unlock a specific page or action once validated

Workflow:

- Read the token from `$$BF_Query`
- Validate it on the server side
- Optionally write a cookie after validation so the user does not need to keep the token in the URL
- Check subsequent requests using `$$BF_Cookies`

```text
// In your onFormRequest hook (FileMaker script)
Set Variable [ $token ; Value: JSONGetElement ( $$BF_Query ; "token" ) ]
// Validate your token here...

// Set a cookie from FileMaker using BF_SetAction_Function (1 day expiry)
Set Variable [ $$BF_Actions ; Value: BF_SetAction_Function ( "Vue.cookie.set('sessionId','abc123',1)" ) ]
```

Guidelines:

- Cookie expiration time should be kept short
- Validate server-side and never expose user secrets in the URL
- After validation, redirect to a normal page URL without the token when possible

## Cookie‑Based Sessions

Use cookies when you want the server or page actions to remember a lightweight access state between requests.

Typical uses:

- Short-lived access after validating a smart link
- Remembering a trusted session identifier
- Passing a non-sensitive server-side lookup key back to FileMaker

Guidelines:

- Use `HttpOnly`, `Secure`, and `SameSite` attributes appropriately
- Keep durations short; rotate or revoke on logout
- Avoid storing sensitive user data in cookies; store only identifiers or session references

Setting cookies from a page action:

```yaml
[
  {
    "action": "cookie",
    "options": { "action": "set", "daysOrOptions": 1, "name": "sessionId", "value": "abc123" }
  }
]
```

Accessing cookies in FileMaker:

```text
// Cookie values are available in $$BF_Cookies (JSON)
JSONGetElement ( $$BF_Cookies ; "myCookieName" )
```

## Related Pages

- [Authentication](./README.md)
- [Security Best Practices](./security-best-practices.md)


