# 1. Configure FileMaker Server

{% hint style="warning" %}
Make sure you review the [system requirements](./#requirements) before you begin
{% endhint %}

## What is the Helper file?

The helper file is a FileMaker file that acts as proxy to the application files that BetterForms will be connecting to. It also includes many other benefits:

* Provides code generation for clipboard pasting of custom functions and scripts
* Allows a single point of entry from the BetterForms framework allowing clear and logical security control
* Contains a user table for tracking users and authentication.
* Allows hook scripts to be run locally for debugging.

## Configuring the Helper File



1. **Download** the helper file. You will find a link to the latest file from the dashboard of the BetterForms online editor.
2. **Change** default user and pass from `admin / admin` to your choice. This password is used in this file only and is just for your access.
3. **Change** the password only for the user account ‘BetterForms’ to a unique one that will be used to access the file by the FMBF servers. Note these credentials will be needed in any file that FM BetterForms interacts with.
4. **Add** a `BetterForms` user credential to your destination legacy FileMaker File. This must have the same credentials as the Helper File above. Make sure to enable data entry only and XML privs. The default password is `123456`
5. **Upload** the file to a V16+ FMS.
6. **Enable** the XML Custom Web publishing gateway, If your server is V17 this will have to be done [from the command line](http://docs.360works.com/index.php/Enable_XML_FileMaker_17%20).

