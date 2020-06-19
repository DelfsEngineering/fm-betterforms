# Custom Domains

FM BetterForms generates custom subdomains with the `*.fmbetterforms.com` domain name space and will automatically generate and maintain a security certificate For custom domains you will have to follow a few steps to configure. 

If your account permits it, you can map fully customized domains to BetterForms servers. 

### Custom Domain Configuration

1. To map the `portal.mycompany.com` domain to one of your sites, visit your DNS provider and add a CNAME record for `portal.mycompany.com` pointing to `alias.bfoperations.com` 
2. In the BetterForms editor under your apps environment page, add your new custom domain.
3. If your CNAME record has not propagated BetterForms will not be able complete your domain configuration. BetterForms servers will periodically retest your DNS.

![Example GoDaddy entry](../../.gitbook/assets/screen-shot-2020-06-19-at-6.28.57-pm.png)



### **Naked Domains**

#### \( update needed \) 

### 

