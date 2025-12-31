# Custom Domains

FM BetterForms generates custom subdomains with the `*.fmbetterforms.com` domain name space and will automatically generate and maintain a security certificate For custom domains you will have to follow a few steps to configure.

If your account permits it, you can map fully customized domains to BetterForms servers.

### Custom Domain Configuration

1. To map the `portal.mycompany.com` domain to one of your apps, visit your DNS provider / registrar ( _eg GoDaddy_ ) and add a **CNAME** record for `portal.mycompany.com` pointing to `alias.bfoperations.com`
2. In the BetterForms editor under your apps environment page, add your new custom domain.
3. Check if your CNAME record has propagated. You can check here: [https://dnschecker.org/#CNAME](https://dnschecker.org/#CNAME)\
   BetterForms will not be able complete your domain configuration until this step has been done.
4. In the BetterForms App editor under the deployments section, add your custom domain. BetterForms servers will complete the connection and generate the security certificate.

![Example GoDaddy entry](../../.gitbook/assets/screen-shot-2020-06-19-at-6.28.57-pm.png)

***

## How Custom Domain Provisioning Works

Understanding the provisioning process can help you troubleshoot issues:

1. **DNS Verification** - BetterForms pings your custom domain to verify connectivity and confirm it resolves to `alias.bfoperations.com` (performed once during initial setup)
2. **Certificate Generation** - Once DNS is verified, BetterForms requests a Let's Encrypt TLS certificate using path-based authentication
3. **Distribution** - The certificate is shared across all BetterForms data centers
4. **Auto-Renewal** - Certificates automatically renew every 60 days

***

## Troubleshooting: Custom Domains Behind CloudFlare

If your custom domain uses **CloudFlare** (or similar CDN/proxy services), you may encounter issues during initial setup.

### Symptoms

* **CloudFlare Error 526**: "Invalid SSL certificate" displayed to visitors
* **BetterForms Environment Alert**: Shows "Awaiting DNS forwarding to alias.bfoperations.com (Last checked: \[timestamp])"
* **Deployment Status**: App is deployed but domain is not fully provisioned

### Root Cause

When CloudFlare's proxy is enabled (indicated by an orange cloud ☁️ icon in CloudFlare DNS settings), your domain resolves to CloudFlare's IP addresses instead of `alias.bfoperations.com`. 

This prevents BetterForms from completing the initial DNS verification required to provision your SSL certificate.

### Solution Options

{% hint style="info" %}
**Note:** Resolving this issue requires access to your CloudFlare account or coordination with your IT team.
{% endhint %}

#### Option 1: Temporarily Disable CloudFlare Proxy (Recommended)

This approach allows BetterForms to manage your SSL certificates automatically:

1. Log into your **CloudFlare dashboard**
2. Navigate to **DNS settings** for your domain
3. Locate the **CNAME record** pointing to `alias.bfoperations.com`
4. Click the **orange cloud ☁️** icon to turn it **grey** (DNS-only mode)
5. Wait for BetterForms to verify and issue the certificate
   * Monitor progress in your BetterForms environment screen
   * This typically takes 5-15 minutes
6. **Optional**: Once the certificate is provisioned and your domain shows as active in BetterForms, you can re-enable the CloudFlare proxy (orange cloud) if desired
7. BetterForms will automatically renew the certificate every 60 days

**Trade-off**: While in DNS-only mode (grey cloud), CloudFlare's proxy features (caching, DDoS protection, Web Application Firewall) are not active for this domain.

#### Option 2: Use CloudFlare-Managed Certificates

Keep CloudFlare proxy enabled and allow CloudFlare to handle SSL certificate management:

1. Keep the **orange cloud ☁️** enabled in CloudFlare DNS
2. Configure CloudFlare's **SSL/TLS settings** appropriately
   * Your IT team will need to configure this
   * Refer to [CloudFlare's SSL documentation](https://developers.cloudflare.com/ssl/)
3. Visitors will see CloudFlare's certificate (typically issued by Google Trust Services) instead of BetterForms' Let's Encrypt certificate

{% hint style="warning" %}
**Important:** With this option, your IT team is responsible for CloudFlare's SSL configuration. BetterForms cannot troubleshoot CloudFlare-specific certificate issues.
{% endhint %}

***

### **Naked Domains**

#### ( update needed )

***
