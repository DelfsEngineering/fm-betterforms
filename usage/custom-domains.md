# Custom Domains

FM BetterForms generates custom subdomains with the `*.fmbetterforms.com` domain name space. 

If your account permits it, you can map fully customized domains to betterforms servers. 

### Custom Domain Configuration

1. To map the `portal.mycompany.com` domain to one of your sites, visit your DNS provider and add a CNAME record for `portal.mycompany.com` pointing to `alias.zeit.co` 
2. BetterForms will add your custom domain to interal register.
3. BetterForms will attempt to access your domain and if successful issue a `TXT`  record token.
4. Place the `TXT` record in your DNS congifuration manager by creating a new TXT record with the prompted parameters.
5. BetterForms will retest your DNS 

\*\*\*\*

### **Naked domains**

You can also use a naked domain like `my-saas-app.com` with this method. In that case, you need to use an [ALIAS](https://support.dnsimple.com/articles/alias-record/) record instead of a CNAME record.

Some DNS providers do not have ALIAS records. In that case, the functionality of ALIAS records is managed using CNAME records.  


### CDN Distribution

For faster initial download times, a CDN option may be applicable to custom domains. Additional costs may apply. Contact support.  
 

