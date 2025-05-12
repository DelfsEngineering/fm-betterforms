# 1. Configure FileMaker Server

{% hint style="warning" %}
Make sure you review the [system requirements](./#requirements) before you begin.
{% endhint %}

## What is the Helper file?

The helper file is a FileMaker file that acts as proxy to the application files that BetterForms will be connecting to. It also includes many other benefits:

* Provides code generation for clipboard pasting of custom functions and scripts
* Allows a single point of entry from the BetterForms framework allowing clear and logical security control
* Contains a user table for tracking users and authentication.
* Allows hook scripts to be run locally for debugging.

## Configuring the Helper File



1. **Download** the helper file. You will find a link to the latest file from the dashboard of the BetterForms online editor.
2. **Change** the default user and pass from **`admin`**` ``/`` `**`admin`** to your choice. This password is used in this file only and is just for your access. This can be your developer credentials you use in other files.
3. **Change** the password only for the user account ‘**BetterForms**’ to a unique one that will be used to access the file by the FMBF servers. Note these credentials will be needed in any file that FM BetterForms interacts with. Note it for later as you will need it.\
   \
   **Only use these credentials within the BetterForms IDE, helper file, and your business file. Avoid using them elsewhere.**
4. **Upload** the file to your FileMaker server.
5. **Add** a `BetterForms` user credential to your existing legacy business FileMaker file. This must have the same credentials as the Helper file above. Make sure to enable data entry only for the privilege set and one or both of the XML and DAPI privs. The default password is **`123456`**
6.  **Enable** the Data API or XML Custom Web publishing gateway. (only do this in your business file)

    If you are using the XML gateway, this will have to be done [from the command line](http://docs.360works.com/index.php/Enable_XML_FileMaker_17).&#x20;

{% hint style="warning" %}
You must have a valid TLS certificate attached to your FileMaker server if you are using the Data API.
{% endhint %}
