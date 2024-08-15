# Understanding Environments

Apps and Environments are the best way to manage your FM BetterForms Projects.

With the introduction to Apps and environments, you now have a great way to manage the development and deployment of your projects.

{% hint style="info" %}
App: Application is a single software project and can consist of a development, test and production environment.
{% endhint %}

{% hint style="info" %}
Environment: Environment is a state of an application, it can be <mark style="color:red;">development</mark>, <mark style="color:red;">staging</mark> or <mark style="color:red;">production</mark>.
{% endhint %}

### Migrating to Apps and Environments

When you migrate from Sites to Apps with the FM BetterForms editor you will see that your sites have been reorganized into Apps and Environments. Every site in your organization will be moved into an environment within an app.

Apps will be in <mark style="color:red;">`production`</mark> after you migrate. The new environment will be created in the <mark style="color:red;">`production`</mark> stage of the application. This is because BetterForms assumes all sites are in production. If your site is still in development, you can move the stage from the environment edit modal.

### **Deploying Your App**

After you have developed features in your app, you will want to deploy it to a <mark style="color:red;">`staging`</mark> environment or directly to <mark style="color:red;">`production`</mark>

{% hint style="info" %}
TIP: If you edit a <mark style="color:red;">production</mark> or <mark style="color:red;">staging</mark> environment and then deploy _from_ that env, the edits that you have made will not be deployed.
{% endhint %}

### Versioning

Every time you deploy your app from a development environment, the app's version will increment. Deploying from <mark style="color:red;">`staging`</mark> or <mark style="color:red;">`production`</mark> stages will not increment the application’s version.

**Environment Locking** It is recommended that you lock environments that you are not editing or environments that are deployed to <mark style="color:red;">`staging`</mark> or <mark style="color:red;">`production`</mark> environments.

### Known Issues

**Multiple Navigation Slugs**

When migrating your site, if you have forms with multiple navigation slugs the migration process will create duplicate forms. This is a known intentional issue with migration.

### **Dealing with backward migrations**

If you are deploying an app from either the <mark style="color:red;">`staging`</mark> or <mark style="color:red;">`production`</mark> stages, the version of the deployment will be the original unedited version of the environment and your edits will not be deployed. This is intentional and prevents versions from overwriting other versions. If you must back-deploy an environment and **must** include your recent edits, first move the environment to the <mark style="color:red;">`development`</mark> stage and deploy from there. This will force BF to create a new version that includes your edits. You can then move the environment back to its original stage
