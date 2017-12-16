# Deployment

After you have installed `BetterForms.fmp12` you can begin to set up a web server.

BetterForms run on [Zeit.co's Now](https://zeit.co/now) service. This is a docker based serverless enviornment and allows for easy deployment and versioning.

1. Obtain a Zeit.co account. 


## Update

FM BetterForms has two components that may need to be updated occasionally.

### Web Server



### FileMaker Connector 



##Custom Domains[](#Custom)

BetterForms deploys on Zeit's Now docker service. You can set up multiple test and production servers easily and have your custom domain point to them as needed.

1. Generate a TXT record access token by aliasing a deployment to your domain. This will error and give you a token to add to the Zone file.

**Command line:**
```
$ now alias sales.Domain.com
// will take the current now deployment and connect it the sales.domain.com and yeild a token on error.

delfs:~/workspace/BetterForms (master) $ now alias bf.delfsengineering.ca
> Assigning alias bf.delfsengineering.ca to deployment...
> bf.delfsengineering.ca is a custom domain.
> Verifying the DNS settings for bf.delfsengineering.ca (see https://zeit.world for help)
> Error! Unknown error: Error: Verification required: Please add the following TXT record on the external DNS server: _now.delfsengineering.ca: 3b2701d39642e0804643b9f58ab3d20a399d142c94994e05b5f7975bd3c0a0dd
Error: Verification required: Please add the following TXT record on the external DNS server: _now.delfsengineering.ca: 3b2701d39642e0804643b9f58ab3d20a399d142c94994e05b5f7975bd3c0a0dd
    at module.exports.EventEmitter.setupDomain.name.retry (/snapshot/now-cli/dist/now.js:859:15)
    at process._tickCallback (internal/process/next_tick.js:109:7)

```


#### GoDaddy Example
2. add zone record of type `TXT` with the host set to `_now` and the TXT Value set to your access token as show below
![](/assets/Screen Shot 2017-12-16 at 4.12.10 PM.png)

3. Rerun the command line alias again:

```
$ now alias sales.Domain.com
// will take the current now deployment and connect it the sales.domain.com and yeild a token on error.

> bf.delfsengineering.ca is a custom domain.
> Verifying the DNS settings for bf.delfsengineering.ca (see https://zeit.world for help)
> Verification OK!
> Success! Alias already exists (yXG8DfFu2Lo6sJ02UZ9NokCe).

```

4. The domain should now function correct. If you are getting a site error check the site's section in **BetterForms.fmp12**. The subdomain must match the subdomain of your Custom Domain.




