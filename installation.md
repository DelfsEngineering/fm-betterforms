# Installation

## Installation Overview

FM BetterForms is a cloud based SAAS platform and requires minimal installation. There is a small FileMaker file `BetterForms_Helper` that is used for assisting developers. This file resides on your FileMaker server.

## Requirements <a id="requirements"></a>

* V16+ FileMaker Server with CWP and XML enabled, V17+ \(preferred\) for data API Support and auto routing scripts.
* CPU powerful enough to handle all script requests, typically  your existing FMS box is more then adequate. 
* Fast connection to your FMS box, data-center recommended.
* Base Elements Plugin for integration only.

### Installation 

#### 1. Configure and upload the Helper file, Upload and configure FMS

Prior to uploading the Helper File \([Read more on the helper file here ](usage/helper-file.md)\) You will need to do a bit of setup.

1. [Download the helper file here ...](https://www.dropbox.com/sh/o8c1k649qpret5r/AAAYa7hKiOZEgBlSL4vCs6kma?dl=0)
2. **Change** default user and pass from `admin / admin` to your choice. This password is used in this file only and is just for your access.
3. **Change** the password only for the user account ‘BetterForms’ to a unique one that will be used to access the file by the FMBF servers. Note these credentials will be needed in any file that FM BetterForms interacts with.
4. **Add** a `BetterForms` user credential to your destination legacy FileMaker File. This must have the same credentials as the Helper File above. Make sure to enable data entry only and XML privs.
5. **Upload** the file to a V16+ FMS.
6. **Enable** the XML Custom Web publishing gateway, If your server is V17 this will have to be done from the command line. This is a good reference: [http://docs.360works.com/index.php/Enable\_XML\_FileMaker\_17](http://docs.360works.com/index.php/Enable_XML_FileMaker_17) on how to enable the XML gateway.

#### 2. Integrate custom functions, scaffold scripts

1. From the helper file, navigate to the integration tab and select step 1. This will copy the custom functions to your clipboard.
2. Paste these custom functions into your business application file.

#### 3. Create a server connection in the BetterForms IDE.

1. Log into the BetterForms IDE web app and select the servers page. 
2. Create a new server connection with the IP or domain name use to access the server.
3. Follow the instructions to test the connection.









