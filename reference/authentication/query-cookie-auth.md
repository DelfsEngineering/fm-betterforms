---
description: Using smart links (query tokens) and cookie-based sessions for streamlined authentication.
---

# Query & Cookie Based Auth

Two complementary patterns that streamline access under controlled conditions.

## Smart Links (Query Tokens)

Use time-bound tokens embedded in URL query parameters to authorize specific actions such as email verification, password resets, or invitation-based access. This workflow is a variation of the smart link pattern.

Common use cases in BetterForms:

- Email verification links (`authVerify` reads token from the URL on the verification page)
- Multi‑page apps where you don’t want to carry a query param in the URL.

Workflow:

- Follow the smart link workflow
- After validating the smart link, add a cookie in the app
- Cookie is added from FileMaker
- Subsequent scripts can check the cookie via `$$BF_Cookies` JSON object
- Typically the initial validation script tests for a Query or a Cookie arg

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
- After validation, redirect to the regular workflow

## Cookie‑Based Sessions

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


