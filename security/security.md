# Firewalls

### Firewalls and Proxies

Some corporate sites may have tight security and host private FileMaker Servers. Since these FMS boxes are behind a tight firewall extra steps may be needed to communicate to the BF cloud servers. 

BF uses server-less auto scaling web servers and as such there is no fixed IP available to white list in your firewall.

The following article discusses how to set up an AWS Lambda function that acts as an API proxy such that all requests will come from a fixed white listable IP. In the BF admin panel set up  your server to point to the Lambda Endpoint.

[https://medium.com/@matthewleak/aws-lambda-functions-with-a-static-ip-89a3ada0b471](https://medium.com/@matthewleak/aws-lambda-functions-with-a-static-ip-89a3ada0b471)

