# Setting up Microsoft Entra ID (Office 365)

Microsoft Entra ID (formerly Azure AD) is one of the OAuth providers supported by Klai Studio. Use it when users should sign in with their Microsoft work or school (Office 365) account.

Before using this guide, make sure you have already set up the shared Klai Studio OAuth requirements in the canonical reference:

- [OAuth](../../reference/authentication/oauth.md)

That page covers the Klai Studio-side flow, required callback page, `authLoginOauth`, `Users.oauthId`, and `onBeforeRegistration`.

## What Is Microsoft-Specific

For Microsoft Entra, the main provider-specific pieces are:

- Create an Entra app registration of type `Web`
- Add the Klai Studio callback URL to the registration
- Copy the Entra credentials into Klai Studio
- Put the **Directory (tenant) ID** (or `common`) in the Klai Studio **Subdomain** field — the same vault shape used by Auth0, Okta, and Google
- Optionally add the `email` claim on ID tokens so Klai Studio can match users reliably

## Create the Entra App Registration

In the [Azure Portal](https://portal.azure.com), open **Microsoft Entra ID** → **App registrations** → **New registration**:

- Name: for example `Klai Studio` or your app name
- Supported account types: usually **Accounts in this organizational directory only** (single tenant) for Office 365 orgs
- Redirect URI platform: **Web**

## Redirect URI (Callback URL)

In the app registration, under **Authentication**, add:

```text
https://yourapp.domain.com/oauth/microsoft/callback
```

If the same Klai Studio app is reachable on multiple domains, add each callback URL as a separate redirect URI.

Examples:

- `https://bfmeetingsdev.clientportal.cloud/oauth/microsoft/callback`
- `https://yourapp.fmbetterforms.com/oauth/microsoft/callback`

## Credentials to Copy Into Klai Studio

Klai Studio expects the same three OAuth vault fields used by other providers:

In Klai Studio, open the app environment menu, choose **App Settings** (or **Env Edit** → **3rd Party Auth**), enable OAuth, and select provider **Microsoft**:

- **Client ID** — Application (client) ID from the Entra overview page
- **Client Secret** — value from **Certificates & secrets** → New client secret
- **Subdomain** — Directory (tenant) ID, or a verified domain such as `contoso.onmicrosoft.com`

| Klai Studio field | Entra value |
| --- | --- |
| Provider | `Microsoft` |
| Subdomain | Directory (tenant) ID, verified domain, or `common` |
| Client ID | Application (client) ID |
| Client Secret | Client secret **value** (not the secret ID) |

Use `common` in Subdomain only when the Entra app is configured for multi-tenant / any Microsoft account. For a typical single-tenant Office 365 org, use the Directory (tenant) ID.

## Token and API Permissions

In the Entra app registration:

1. **API permissions** — add Microsoft Graph delegated permissions `openid`, `profile`, and `email` (and grant admin consent if your tenant requires it).
2. **Token configuration** — optional claims → ID → add **email** so the ID token includes an email address when available.

Klai Studio looks up users by email. If `email` is missing from the ID token, Klai Studio falls back to `preferred_username` when that value looks like an email.

## Start Microsoft Login

Start the flow with a `path` action:

```json
{
  "action": "path",
  "options": {
    "sameWindow": true,
    "url": "/oauth/microsoft"
  }
}
```

## Allowing New Users

If OAuth users should be allowed to create Klai Studio users automatically, your FileMaker integration must support the `onBeforeRegistration` hook and return `model.createUser = true` when registration should proceed.

If that hook is missing, or if it does not allow the user, Klai Studio will not create the new account.

## Optional: Force a Full Microsoft Logout

`authLogout` clears the Klai Studio session. If you also need to clear the Microsoft-hosted session, redirect the browser to Entra's end-session endpoint after `authLogout`.

```json
"logout": [
  {
    "action": "authLogout"
  },
  {
    "action": "path",
    "function": "action.options.url = `https://login.microsoftonline.com/YOUR_TENANT_ID/oauth2/v2.0/logout?post_logout_redirect_uri=https://${window.location.host}`",
    "options": {
      "sameWindow": true,
      "url": "/"
    }
  }
]
```

Replace `YOUR_TENANT_ID` with your Directory (tenant) ID (or `common` if that matches how you configured the app).

## Troubleshooting

- **Redirect URI mismatch** — the URI in Entra must match exactly, including `https` and `/oauth/microsoft/callback`.
- **User not found / no email** — add the ID token `email` optional claim, or confirm `preferred_username` is an email UPN.
- **Wrong tenant** — single-tenant apps need the Directory (tenant) ID in Klai Studio Subdomain, not another org's ID.
- **Personal Microsoft accounts fail** — check the app registration's supported account types; work/school-only apps reject personal MSA accounts.
