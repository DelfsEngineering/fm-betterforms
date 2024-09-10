# BF Enterprise Documentation

### Overview

FM BetterForms Enterprise is an extension of the FM BetterForms Cloud service allowing fully autonomous standalone operation.

#### Features

* Fully standalone serving of BF apps
* Apps are built with BF Cloud in the same manner as regular apps
* Apps can live both in the cloud and on-premise
* Choose which apps to host

#### Overview Diagram

{% embed url="https://whimsical.com/enterprise-deployment-and-architecture-Ew1asCqpaCGiZsBZzgEy9x" %}

### Requirements

BF Enterprise runs out of a docker image and new BF Enterprise Helper file, therefore the requirements are:

* Docker Instance (Min 1);
* [Env settings file](bf-enterprise-documentation.md#env-file);
* BF Enterprise Helper FileMaker File (will be provided);
* BF App migrated to the latest BF Editor (Environments version)
* FileMaker 19+.

**Optional** (not included with BF Enterprise docker image):

* **Redis** database for caching and increased performance/availability
* **Redis** database for messages (Sync between different servers, if more than one is being used);
* **Redis** database for OAuth if OAuth authentication is needed

**Creating Redis server from Docker images**

After installing Docker, as described [below](bf-enterprise-documentation.md#setting-up-the-server), a Redis database could be installed on the server as well.

Link to Redis’ official docs on how to run Redis Stack on Docker: [https://redis.io/docs/stack/get-started/install/docker/](https://redis.io/docs/stack/get-started/install/docker/)

{% hint style="info" %}
As a development environment, this Redis Stack instance can be deployed on localhost, and the env var <mark style="color:red;">`REDIS_HOST`</mark> will be <mark style="color:red;">`host.docker.internal`</mark> and a password won’t be needed.
{% endhint %}

### Env File

Default environment variables to be declared in the file:

| Key                        | Info                                                                                                                | Required |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- |
| FMS\_CONNECTION\_DB        | FileMaker database name (Enterprise File)                                                                           | Yes      |
| FMS\_CONNECTION\_HOST      | FileMaker host address                                                                                              | Yes      |
| FMS\_CONNECTION\_USER      | FileMaker username                                                                                                  | Yes      |
| FMS\_CONNECTION\_PASS      | FileMaker password                                                                                                  | Yes      |
| AUTHENTICATION\_SECRET     | Salt used in authentication service                                                                                 | Yes      |
| ENCRYPTION\_KEY            | Sal used to generate vaults                                                                                         | Yes      |
| ISENTERPRISE               | Set to enterprise mode (must be set as ISENTERPRISE=true)                                                           | Yes      |
| FM\_GATEWAY                | XML or DAPI - gateway to be used to communicate with BF Enterprise Helper file (defaults to XML if no value is set) | No       |
| NOW\_DC                    | used to identify which server app is running from                                                                   | No       |
| REDIS\_HOST                | Redis host address for caching                                                                                      | No       |
| REDIS\_PASSWORD            | Redis password for caching                                                                                          | No       |
| REDIS\_PORT                | Redis port for caching                                                                                              | No       |
| REDIS\_HOST\_MESSAGING     | Redis host address for messaging                                                                                    | No       |
| REDIS\_PASSWORD\_MESSAGING | Redis password for messaging                                                                                        | No       |
| REDIS\_PORT\_MESSAGING     | Redis port for messaging                                                                                            | No       |
| REDIS\_SECRET\_MESSAGING   | Redis secret for messaging                                                                                          | No       |
| REDIS\_HOST\_OAUTH         | Redis host address for OAuth                                                                                        | No       |
| REDIS\_PASSWORD\_OAUTH     | Redis password for OAuth                                                                                            | No       |
| REDIS\_PORT\_OAUTH         | Redis port for OAuth                                                                                                | No       |
| REDIS\_SECRET\_OAUTH       | Redis secret for OAuth                                                                                              | No       |

Here is a sample file (where values for the right hand side will be changed to your own info):

[env .development\_sample.development](../.gitbook/assets/env\_.development\_sample.development)

### Setting up the Server

#### Installation

Find the links to Docker’s official docs on how to install Docker on each OS.

{% hint style="info" %}
&#x20;Windows and MacOS only available for the Desktop version, whereas Linux has the option to use Engine (server) or Desktop.
{% endhint %}

*   Linux

    * Desktop: [https://docs.docker.com/desktop/linux/install/](https://docs.docker.com/desktop/linux/install/)
    * Engine

    | Distro | Link                                                                                             |
    | ------ | ------------------------------------------------------------------------------------------------ |
    | CentOS | [https://docs.docker.com/engine/install/centos/](https://docs.docker.com/engine/install/centos/) |
    | Debian | [https://docs.docker.com/engine/install/debian/](https://docs.docker.com/engine/install/debian/) |
    | Fedora | [https://docs.docker.com/engine/install/fedora/](https://docs.docker.com/engine/install/fedora/) |
    | RHEL   | [https://docs.docker.com/engine/install/rhel/](https://docs.docker.com/engine/install/rhel/)     |
    | SLES   | [https://docs.docker.com/engine/install/sles/](https://docs.docker.com/engine/install/sles/)     |
    | Ubuntu | [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/) |
* Windows
  * Desktop: [https://docs.docker.com/desktop/windows/install/](https://docs.docker.com/desktop/windows/install/)
* MacOS
  * [https://docs.docker.com/desktop/mac/install/](https://docs.docker.com/desktop/mac/install/)

#### Loading image to a local repository

As of Jun 1st, 2022, the docker image is distributed via .tar file. In order to load this file to your local docker repository and be able to start the BF server, run the following docker command.

```json
docker load -i bf-enterprise-v0-10-84.tar
```

#### Starting Server

Once server is setup and Docker installed in it, the following command can be used to start the service.

```jsx
docker run -dp 80:80 --env-file yourEnvFile ourPublicRepo/betterforms:V0.10.84-bfe
```

* Where:
  * yourEnvFile: env file created according to previous section;
  * ourPublicRepo: repository where our docker image will be hosted.

#### Restarting Policies

When starting pods, different restart policies can be set for them:

* no - default option;
* on-failure;
* always;
* unless-stopped;

More information can be found on this [link](https://docs.docker.com/config/containers/start-containers-automatically/).

An example of how to start a new pod using a restart policy would be:

```jsx
docker run -dp 80:80 --restart always --env-file yourEnvFile ourPublicRepo/betterforms:V0.10.84-bfe
```

#### Scaling up

Using the command above will start one pod, equivalent to one BF server. In order to increase availability and performance, more pods can be deployed in single or multiple servers. If multiple servers are being used, it will be necessary to use a load balancer in front of those servers to distribute load between multiple pods.

### Hardware Recommendations

Minimum requirements for each pod are:

| Resource | Value     |
| -------- | --------- |
| Memory   | 200 MB    |
| CPU      | 0.425 CPU |

## FM Credentials - Helper file

In order to enter the credentials that will be used to connect to your Helper file, you need to login into the enterprise file and use the UI to download the data from the cloud to your local enterprise file.

Once you have all records saved locally, you should have a connection record for each environment that was downloaded. Find the record that needs to be set the credentials in the <mark style="color:red;">`Connections`</mark> layout. The credentials will be added in the <mark style="color:red;">`serverJSON`</mark> field under the key `vault`, now make sure it’s under `vault` and not <mark style="color:red;">`oauth.vault`</mark>.

As shown in the image below, you should have a <mark style="color:red;">`vault`</mark> key with an empty object.

![Untitled](<../.gitbook/assets/Untitled (1).png>)

Add your credentials as an object as follows.

```json
{"username": "FM_USERNAME", "password": "FM_PASSWORD"}
```

If that still returns an error saying that “FileMaker Helper Credentials missing database name or user or password”, then add `username` and `password` to root path. In this case, the `serverJSON` object would look like

```json
{
  "active": true,
  "apiKey": "BFAPI_XXXXXXX",
  "commonHookSetName": "app",
  "database": "BetterForms_Helper",
  "domains": ["your.app.domain"],
  "gateway": "DAPI",
  "hostAddress": "your.host.address",
  "id": "SV_YYYYYYY",
  "isDevMode": true,
  "oauth": {},
  "password": "YOUR-PASSWORD",
  "subDomain": "",
  "user": "BetterForms",
  "vault": {}
}
```

## How it works

### Development

All development is done in the cloud, in other words, we recommend that you have a development environment as part of your app that still has a domain pointing to it using BetterForm’s infrastructure (a <mark style="color:red;">`.fmbetterforms.com`</mark> domain could be used for this, for example). This will allow you to develop your app the same way as other apps. Once development is done and ready to deploy, then it can be deployed to the environment that will be downloaded to your on-premise enterprise file.

### Downloading environment data

In order to download the environment to your local enterprise file:

1. Open your enterprise file and log into the enterprise app using your BetterForms credentials;
2. Select the organization that has the Enterprise subscription;
3. Choose the app;
4. Find the desired environment and click on <mark style="color:red;">`Download`</mark>.

Once the download is complete, <mark style="color:red;">`Environments`</mark>, <mark style="color:red;">`Connections`</mark>, <mark style="color:red;">`SiteModel`</mark> and <mark style="color:red;">`Forms`</mark> layouts should have new records added to them, and ready to serve your app from your on-premise enterprise file.
