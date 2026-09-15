# Custom Domains

Klai Studio generates custom subdomains with the `*.fmbetterforms.com` domain name space and will automatically generate and maintain a security certificate. For custom domains you will have to follow a few steps to configure.

If your account permits it, you can map fully customized domains to BetterForms servers.

### Custom Domain Configuration

1. To map the `portal.mycompany.com` domain to one of your apps, visit your DNS provider / registrar ( _eg GoDaddy_ ) and add a **CNAME** record for `portal.mycompany.com` pointing to `alias.bfoperations.com`\
   If this record sits behind Cloudflare or another CDN/proxy, set it to **DNS-only** first. See [Troubleshooting: Custom Domains Behind Cloudflare or a similar proxy](#troubleshooting-custom-domains-behind-cloudflare-or-a-similar-proxy).
2. In the BetterForms editor under your apps environment page, add your new custom domain.
3. Check if your CNAME record has propagated. You can check here: [https://dnschecker.org/#CNAME](https://dnschecker.org/#CNAME)\
   BetterForms will not be able complete your domain configuration until this step has been done. The lookup must show `alias.bfoperations.com`, not a CDN or proxy hostname.
4. In the BetterForms App editor under the deployments section, add your custom domain. BetterForms servers will complete the connection and generate the security certificate.

![Example GoDaddy entry](<../../.gitbook/assets/screen-shot-2020-06-19-at-6.28.57-pm (1).png>)

If your DNS provider shows both the alias and verification records together, it may look like this:

![Example CNAME and TXT records](<../../.gitbook/assets/screen-shot-2018-12-09-at-7.40.47-pm (1).png>)

***

## How Custom Domain Provisioning Works

Understanding the provisioning process can help you troubleshoot issues:

1. **DNS Verification** - BetterForms pings your custom domain to verify connectivity and confirm it resolves to `alias.bfoperations.com` (performed once during initial setup)
2. **Certificate Generation** - Once DNS is verified, BetterForms requests a Let's Encrypt TLS certificate using HTTP path-based authentication at `/.well-known/acme-challenge/<TOKEN>`
3. **Distribution** - The certificate is shared across all BetterForms data centers
4. **Auto-Renewal** - Certificates automatically renew every 60 days using the same ACME path. Each renewal uses a unique token:

   ```
   /.well-known/acme-challenge/<TOKEN>
   ```

   Let's Encrypt must reach that URL on your custom domain and receive the challenge response from BetterForms. A CDN or proxy that intercepts, caches, or SSL-terminates that path will block issuance and renewal.

***

## Troubleshooting: Custom Domains Behind Cloudflare or a similar proxy

If your custom domain uses **Cloudflare** or another CDN / reverse proxy (Akamai, Fastly, AWS CloudFront, and similar), BetterForms often cannot see the real CNAME target. That blocks certificate issuance, certificate renewal, and sometimes environment updates such as basecode changes.

{% hint style="warning" %}
Leave the CNAME in **DNS-only** mode until BetterForms has verified DNS and issued the certificate. Proxied records (Cloudflare orange cloud) resolve to the proxy, not `alias.bfoperations.com`.
{% endhint %}

### Symptoms

* **Environment not configured**: BetterForms flags the environment as waiting for DNS and may refuse basecode / deployment updates until the domain verifies
* **Cloudflare Error 526**: "Invalid SSL certificate" displayed to visitors
* **BetterForms Environment Alert**: Shows "Awaiting DNS forwarding to alias.bfoperations.com (Last checked: \[timestamp])"
* **Deployment Status**: App is deployed but domain is not fully provisioned
* **Certificate renewal later fails** even after the first cert worked, if the proxy was turned back on and Let's Encrypt can no longer reach the ACME path

### Root Cause

When a proxy is enabled (Cloudflare: orange cloud ☁️), public DNS returns the proxy's IPs instead of `alias.bfoperations.com`. BetterForms therefore cannot complete DNS verification.

Separately, Let's Encrypt must fetch a unique token on this path for **every** issue and renewal:

```
/.well-known/acme-challenge/<TOKEN>
```

If the proxy caches, rewrites, redirects, or terminates TLS for that path, the challenge never reaches BetterForms and the certificate cannot be issued or renewed. Do not implement this path in FileMaker or app code; the certificate manager owns it.

### Solution Options

{% hint style="info" %}
**Note:** Resolving this issue requires access to your DNS / CDN account or coordination with your IT team.
{% endhint %}

#### Option 1: Use DNS-only (recommended)

This lets BetterForms verify DNS and manage Let's Encrypt certificates automatically:

1. In your DNS / CDN dashboard, find the **CNAME** pointing to `alias.bfoperations.com`
2. Turn **proxy / CDN off** for that record (Cloudflare: click the orange cloud so it turns **grey** / DNS-only)
3. Wait for public DNS to show `alias.bfoperations.com` ([dnschecker.org](https://dnschecker.org/#CNAME))
4. In BetterForms, keep the custom domain on the environment. The editor retries until DNS is correct, then issues the certificate
   * Typical wait: 5–15 minutes after DNS is actually live
   * If the domain is stuck, delete and re-add it in BetterForms after DNS is DNS-only
5. After the environment shows the domain as active, you can apply basecode and other environment changes
6. Prefer leaving the record DNS-only so **renewals every 60 days** keep working. If you must turn the proxy back on, allow HTTP through to origin for `/.well-known/acme-challenge/*` with no cache and no redirect. Otherwise disable the proxy again before each renewal.

**Trade-off**: DNS-only mode does not use the CDN's caching, DDoS protection, or WAF for this hostname.

#### Option 2: Let the CDN manage certificates

Keep the proxy enabled and let Cloudflare (or your CDN) terminate TLS:

1. Keep proxy enabled (Cloudflare orange cloud)
2. Configure the CDN **SSL/TLS** settings (usually Full or Full Strict once an origin cert exists)
   * Your IT team owns this
   * See [Cloudflare SSL documentation](https://developers.cloudflare.com/ssl/)
3. Visitors will see the CDN's certificate, not BetterForms' Let's Encrypt certificate

{% hint style="warning" %}
**Important:** With this option, your IT team is responsible for CDN SSL. BetterForms cannot troubleshoot those certificate issues, and BetterForms-managed Let's Encrypt renewals will not succeed while the proxy hides origin DNS and the ACME path.
{% endhint %}

***

### **Naked Domains**

#### ( update needed )

***
