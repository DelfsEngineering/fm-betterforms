# BF Server Proxy

### Overview

The BF Proxy can be used to provide a single known IP address to access a given database server. This allows IT professionals to tightly configure access control to their internal network. The current proxy IP is located in North America.

#### PROS

Dev Ops technicians can whitelist only one IP address from the FM BetterForms Cloud servers.

#### CONS

Some latency is added depending on your geographic location, this is generally small.

#### Specifications

Fixed IP Address is: <mark style="color:blue;">**`54.215.158.200`**</mark>

Port: <mark style="color:blue;">**`443`**</mark>

Proxy location: **AWS Data Center in Northern California. `US-WEST-1`**

#### Configuring

_<mark style="color:orange;">The following is a temporary provision until the UI in the BF editor is built</mark>_

Add a new server or change currently used by the app. The host address for the server will be:

<pre class="language-markup"><code class="lang-markup"><strong>4yt4c3i6n7tndqe6732fsbgxhq0gsaim.lambda-url.us-west-1.on.aws/YOUR.SERVER.DOMAIN
</strong></code></pre>

Note: Change <mark style="color:red;">`YOUR.SERVER.DOMAIN`</mark> to point to the FQDN of your FileMaker server.

<figure><img src="../.gitbook/assets/Untitled (1) (1).png" alt=""><figcaption></figcaption></figure>

#### Testing Connection

To test the proxy:

1. Build the full proxy URL using your FileMaker server FQDN:

   `http://4yt4c3i6n7tndqe6732fsbgxhq0gsaim.lambda-url.us-west-1.on.aws/YOUR.SERVER.DOMAIN`

2. Open that URL in a browser.
3. Confirm that the request reaches your FileMaker web server through the proxy.

If the proxy is working, you should reach the same kind of response page your FileMaker server would normally return for a direct browser request.

If it does not work, check:

- the server FQDN is correct
- your FileMaker server is reachable on the expected web endpoint
- your network rules allow the published proxy IP
- you did not omit the server domain portion of the proxy URL

Example response:

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 //EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>FileMaker Website</title>
        <style type="text/css">
        .centered {
             display: block;
             margin-left: auto;
             margin-right: auto;
             text-align: center;
             vertical-align: middle;
        }
        </style>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
</head>

<body>
    <h1  class="centered" >FileMaker Database Server Website</h1>
    
    <img class="centered" src="TestPage.png" alt="Claris International Inc." />
</body>

</html>
```
