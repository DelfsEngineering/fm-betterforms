---
description: Configure per-tenant JWT authentication token expiry and domain audience.
---

# JWT Expiration (Per‑Tenant)

You can choose how long a user stays signed in before they need to sign in again. This is controlled by the JWT expiration setting for your app (tenant).

## Who is this for?

Anyone managing a BetterForms app who wants to balance convenience and security. Shorter times are more secure; longer times mean fewer logins for your users.

## Availability

- Requires basecode version v3.2.6+.

## How to change it (2 steps)

1) Open your app’s settings
- App Settings → Authentication → Token Expiry

2) Enter how long tokens should last
- Examples you can paste:
  - `1h` (1 hour)
  - `8h` (workday)
  - `7d` (one week)
  - Or a number of seconds like `604800` (7 days)

Tip: Leave it blank to use the default of 24 hours.

## What happens behind the scenes

- Your choice is saved with your app and used to issue new sign‑in tokens.
- For advanced admins: the value is stored on the tenant connection as `jwtOptions.expiresIn`.

## Domain safety (why a token from one site won’t work on another)

- Tokens are locked to your site’s domain (called the “audience”). Using the same token on a different domain or tenant will be rejected automatically.

## Notes for teams using a proxy or CDN

- Nginx: `proxy_set_header Host $host;`
- AWS ALB: turn on “preserve host header”
- Cloudflare: set “Origin host header” to On

### If you see this error

It usually means the server didn’t receive the original site domain. Check:
- Your proxy/load balancer forwards the original Host header
- Your domain actually matches the site that issued the token
- Your platform version is v3.2.6 or newer




