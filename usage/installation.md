# Installation

## Installation Overview

FM BetterForms is a cloud based SAAS platform and requires minimal installation. There is a small FileMaker file `BetterForms_Helper` that is used for assisting developers. This file resides on your FileMaker server.

## Requirements <a href="#requirements" id="requirements"></a>

* V16+ FileMaker Server with CWP and XML enabled, V17+ (preferred) for data API Support and auto routing scripts.
* CPU powerful enough to handle all script requests, typically your existing FMS box is more then adequate.
* Fast connection to your FMS box, data-center recommended.
* Base Elements Plugin for integration only.

### Installation

#### 1. Configure and upload the Helper file, Upload and configure FMS

Prior to uploading the Helper File ([Read more on the helper file here ](helper-file.md)) You will need to do a bit of setup.

1. [Download the helper file here ...](https://www.dropbox.com/sh/o8c1k649qpret5r/AAAYa7hKiOZEgBlSL4vCs6kma?dl=0)
2. **Change** default user and pass from `admin / admin` to your choice. This password is used in this file only and is just for your access.
3. **Change** the password only for the user account ‘BetterForms’ to a unique one that will be used to access the file by the FMBF servers. Note these credentials will be needed in any file that FM BetterForms interacts with.
4. **Add** a `BetterForms` user credential to your destination legacy FileMaker File. This must have the same credentials as the Helper File above. Make sure to enable data entry only and XML privs.
5. **Upload** the file to a V16+ FMS.
6. **Enable** the XML Custom Web publishing gateway, If your server is V17 this will have to be done from the command line. This is a good reference: [http://docs.360works.com/index.php/Enable\_XML\_FileMaker\_17](http://docs.360works.com/index.php/Enable\_XML\_FileMaker\_17) on how to enable the XML gateway.

#### 2. Create server connection in the BetterForms IDE and test connection.

1. Log into the BetterForms IDE web app and select the servers page.
2. Create a new server connection with the IP or domain name used to access the server.
3. Follow the instructions to test the connection.

{% hint style="warning" %}
If you have filter databases on in the FMS Admin panel, you will not see the files available you will see:

```
{"messages":[{"code":"9","message":"Insufficient privileges"}],"response":{}}` 
```

instead of the files hosted.

&#x20;![](<../.gitbook/assets/image (21).png>)
{% endhint %}



#### 3. Install custom functions

For this step [please review the section on](hooksoverview/scopedoverview/hooks.md) `common` and `scoped` hooks to properly understand the differences.

1. From the helper file, navigate to the integration tab and select step 1. This will copy the custom functions to your clipboard.
2. Paste these custom functions into your business application file.

#### 4. Install scaffold scripts for common and 1st scoped hookset.

For this step [please review the section on](hooksoverview/scopedoverview/hooks.md) `common` and `scoped` hooks to properly understand the differences.

1. From the helper file integration tab, select '_Create Scaffold Hook set_' and paste these folders and scripts into your business application. Note you do not need to create a folder for this as they are already contained within a folder. _Please make sure you understand the names you give common and scoped hook sets._
