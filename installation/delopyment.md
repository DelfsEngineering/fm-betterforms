# Deployment

After you have installed `BetterForms.fmp12` you can begin to set up a web server.

BetterForms run on [Zeit.co's Now](https://zeit.co/now) service. This is a docker bases serverless enviornment and allows for easy deployment and versioning.

1. Obtain a Zeit.co account. 




## Update

FM BetterForms has two components that may need to be updated occasionally.

### Web Server



### FileMaker Connector 



##Custom Domains

BetterForms deploys on Zeit's Now docker service. You can set up multiple test and production servers easily and have your custom domain point to them as needed.

1. Point your domain name servers or subdomain name server to he following:
```
california.zeit.world    173.255.215.107
newark.zeit.world        173.255.231.87
london.zeit.world        178.62.47.76
singapore.zeit.world     119.81.97.170
```



**Commanline:**
```
$ now alias sales.Domain.com
// will check namse rvers and prompt if not set.

```

