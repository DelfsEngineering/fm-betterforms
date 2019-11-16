---
description: How to use the dropzone element to upload files directly to an AWS S3 bucket.
---

# dropzone to S3

{% hint style="danger" %}
This page is still under development
{% endhint %}

## Introduction

If you want your users to upload large files, S3 is a great option. However, it can be tricky to navigate because of how it is secure by default. The Dropzone uploader wants to be able to push a file to a URL endpoint, but S3 doesn't provide that for security purposes. Other techniques suggest using a **Lambda** function to generate that signed URL, which is possible. However, this guide will focus on using the AWS JavaScript SDK to upload directly from a browser.

{% hint style="warning" %}
The method that will be outlined on this page is **advanced** and not directly supported by BetterForms. These techniques were compiled from around the internet and are implemented into BetterForms by taking advantage of how BetterForms exposes HTML and JavaScript in the page editor
{% endhint %}

## Configuring AWS

If you don't already have an AWS account, sign up [here](https://portal.aws.amazon.com/billing/signup#/start).

### 1. Amazon Cognito

Amazon Cognito is the user management service that we'll use to authenticate our application to AWS for uploading. Cognito allows for us to configure permissions for anonymous users, which will be useful in this case so that we don't have to worry about user credentials when uploading to our bucket.

1. From the AWS Console, navigate to the **Cognito** service.
2. Make sure you're in your preferred region \(Cognito is not available in all regions\)
3. Create a new Identity Pool
4. Be sure to check the box labeled **Enable access to unauthenticated identities**. All other settings can be left at default, then click **Create Pool**
5. The next page will create new roles in IAM for this identity pool. Simply click **Allow** to continue.
6. In the final confirmation screen, make note of your **Identity Pool ID**.

### 2. Configuring your S3 bucket

Let's create a new bucket for you uploads. Since this bucket will have public access, it's good to make a separate bucket so that you can isolate data concerns.

1. From the AWS Console, navigate to the **S3** service.
2. Create a new bucket. Make sure that it's configured in the same region as your Cognito Identity Pool that was setup in step 1.
3. When configuring the bucket, all settings can be left at their defaults.
4. Navigate to the bucket, then to the **Permissions** tab.
5. In the **CORS configuration** section, add the following code. This will allow any browser to send a PUT request to your bucket, which is how the upload works

```markup
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <ExposeHeader>ETag</ExposeHeader>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

### 3. Configuring IAM policy

Lastly, we need to configure the policy for Cognito Role that we created in step 1 to have write access to the bucket we created in step 2.

1. From the AWS Console, navigate to the **IAM** service.
2. In the sidebar, click on **Roles** and locate the Unauth role that was created for your Cognito Identity Pool. It should follow a pattern like `Cognito_appnameUnauth_Role` where `appname` is the name you gave to your Identity Pool.
3. Choose the option to **Add inline policy**, then navigate to the JSON tab and paste in the following code. These are the absolute minimal settings that will allow this anonymous user to put things into the bucket but nothing else.

```yaml
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:ListBucketMultipartUploads",
                "s3:ListMultipartUploadParts",
                "s3:PutObject",
                "s3:GetObjectAcl",
                "s3:AbortMultipartUpload",
                "s3:GetBucketCORS",
                "s3:PutObjectAcl"
            ],
            "Resource": [
                "arn:aws:s3:::example-bucket/*",
                "arn:aws:s3:::example-bucket"
            ]
        }
    ]
}
```

{% hint style="warning" %}
Make sure you change the `example-bucket` in lines 17-18 with the name of **your own** bucket
{% endhint %}

Now we're ready to go back to BetterForms! Feel free to navigate back to S3 and keep it open in a new tab for inspection of your files as we upload them...

## Configuring your Site Settings

Since this method requires external libraries not provided by BetterForms, you'll need to inject them into your site using a [DOM Header Insertion](../../site-settings/slots-code-injection.md#dom-header-insertion).

```markup
<script src="https://cdnjs.cloudflare.com/ajax/libs/aws-sdk/2.543.0/aws-sdk.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.2.0/min/dropzone.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.2.0/min/dropzone.min.css" rel="stylesheet">
```

{% hint style="info" %}
These libraries may have been updated since the time of this writing, check the original sources for the most updated CDN links.

* [AWS SDK](https://cdnjs.com/libraries/aws-sdk)
* [Dropzone.JS](https://cdnjs.com/libraries/dropzone)
{% endhint %}

## Configuring your Page

Now that you have your AWS bucket and credentials setup, you can plug in your values to the [example page](https://app.fmbetterforms.com/#/forms/formedetail?id=4994183D-C0B6-0444-A443-032904BDA204) to see this in action. The rest of this guide assumes that you have duplicated that page into your own site so that you have access to the JavaScript and HTML code there.

### HTML

To insert the Dropzone element in your page, we'll use an [HTML element](../common/html.md). The id of `myDZ` is the most crucial piece, and is how we will target this element using the JavaScript.

```markup
<form id="myDZ" action="/file-upload" class="vue-dropzone dropzone">
  <div class="fallback">
    <input name="file" type="file" multiple />
  </div>
  <div class="dz-message text-center">
      <!-- Customize this div with your own elements -->
      <h1>Drop your file here, or click to browse</h1>
  </div>
</form>
```

### JavaScript

To initialize the dropzone, you need to run some JavaScript code that programmatically configures all of the settings. I recommend doing this in a [named action](../../actions-processor/actions_named.md#defining-named-actions) on the page so that you can call it at a specific place in your users workflow if necessary. In my testing, I found that putting this code in the `onFormLoad` named action works about half of the time because sometimes the code runs before the page is fully rendered and therefore cannot be attached to the form.

{% hint style="info" %}
See the full code in the `initDZ` named action on the example page.
{% endhint %}

The first few lines of this code is where you'll configure with your settings from AWS. Feel free to hard-code these value into the JavaScript function instead of referencing model unless you want to programmatically change them later.

Your **bucketRegion** should match the start of your **Identity Pool ID**. For example, if your Identity Pool ID is `us-west-2:5fxxxxxxx-2696-4xxxx-8xxxxxx-dxxxxxxxx` then your bucket region would be `us-west-2`

```javascript
var bucketName = model.settings.bucketName;
// var bucketName = 'example-bucket';   <-- for hard coding, use quotes
var bucketRegion = model.settings.region;
var IdentityPoolId = model.settings.identityPool;
```

For the **options** variable, see the [Dropzone documentation](https://www.dropzonejs.com/#configuration) if you'd like to further customize the element.

If you follow along with the code, you'll notice that I'm adding files to an array as they are added to the dropzone and moving them to a _different_ array when the upload is complete. Finally, the named action called `onDropzoneComplete` runs when all the files have uploaded. This is where you can run a [Utility Hook](../../actions-processor/actions_overview/runutilityhook.md) back to your FMS to save the data in your database.

{% hint style="warning" %}
Be sure to leave the default keys in the Data Model when duplicating the example page. These keys are directly referenced by the JavaScript code and it may fail if these keys do not exist.
{% endhint %}

