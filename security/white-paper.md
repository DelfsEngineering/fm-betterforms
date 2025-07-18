# Security White Paper

## PRELIMINARY

### Nomenclature:

* Authentication - Ensuring the identity of a user.
* Authorization - Ensuring that an authorized user is allowed to perform a workflow.
* BF - FM BetterForms
* FMS - FileMaker Server
* JWT - JSON Web Token, a securely signed token that is immutable.
* CWP - Custom Web Publishing, a method of connecting and exposing data to third-party applications.

## Browser (Client)

TLS Certificates are automatically generated for \*.[fmbetterforms.com](https://app.fmbetterforms.com/) domains. Custom domains will also get a generated domain or subdomain certificate with Let's Encrypt, a free certificate service.

Authenticated and Un-Authenticated Pages - BF allows web pages (form/layout) to be accessed with and without authentication. By default, Pages need authentication. This is indicated visually in the BF editor.

After a user is logged into a page that requires authentication, their credentials are one-way hashed and compared to those in the user table in the BF helper file.

A JWT (JSON Web Token) token is generated using industry approved encryption. JWTs are immutable and ensure the client is who they claim to be.

It is important to be mindful of any local or session storage you may have enabled in the client. See [Optimizing Data - caching](../getting-started/ide-quick-tour/environment/pages-deep-dive/page-data-model-config.md#caching-and-syncing)

## Web Servers

BetterForms uses immutable server-less deployments for the web-facing servers. Once these servers are deployed they cannot be modified or logged into.

Any web interface, regardless of technology, needs to access your system with some connection method. Traditional FM web publishing exposes all data tables (layouts) that the credentials have access to. (Traditional CWP exposes tables and all records, the PHP web server code must apply its own business logic.)

#### Server Secrets

When the server is first deployed it is given all of the secrets (keys, links, etc.) it needs to know and they are saved in memory only after the server starts up. This makes it hard to retrieve the secrets.

#### Client account credentials

In order for BF to access an FMS server it must retain a set of credentials (see FileMaker Credentials section). These credentials are encrypted and saved on the BF application server. The credentials are decrypted immediately before each FMS server interaction with a decryption key that is injected into the BF server upon start up.

aes-256-cbc with random IV (initialization Vector) Decrypted on fly, cached data remains encrypted until retrieved.

## FileMaker

#### FileMaker Credentials

The credential that BF uses to access FMS has very limited scope.

* CWP API Gateway only (cannot be used).
* Read Write Access Only (not full admin).
* Can only run scripts/layouts it's given access to.

All BF interactions to FMS are performed via scripts. This give great control over workflow and makes it easy to keep tight security.

Even knowing the password does not actually grant the user data, but allows them to run the hook script at most. It is important that at the top of scripts that need to restrict data the user id is verified for authorization.

You can add additional restrictions to the BetterForms account credential by the following:

* Only grant the account access to the BF hook scripts and any scripts they reach.
* Since all access is via a script and NOT direct access to your tables, your scripts can check for additional authentication (user is logged in, user allowed to fetch data etc) in the hook scripts.
* **User ID**

If a user is authenticated, their JWT user ID is passed into all scripts so the script can check for authorization and authentication.

#### User Tables

BF comes with a helper file that contains a user table with a securely based credential. Developers can also control:

* Enable / Disable Account
* Force account email to be verified

#### Helper File

Incoming traffic from the BF server only enters the Helper File. The helper file acts as a credential firewall and adds a degree of isolation between the legacy file.

#### Techniques for increasing security (Proposed - Edit needed)

* Use perform script on server between proper file and legacy file.
* Re-login when calling legacy file plug scripts.
* Change privileges in legacy file to not allow XML.
* Have legacy file not allow any layouts with XML access.
* Only allow CWP inbound calls to come from better forms Web server IP via an API Proxy.
