---
description: >-
  FM BetterForms integration takes about 10 minutes when you are properly
  prepared.
---

# ⚙️ Integration

## Installation Overview

FM BetterForms is a cloud based PaaS (Platform as a Service) and requires minimal installation. There is a small FileMaker file called the  **`BetterForms_Helper`** that is used for assisting developers. This file resides on your FileMaker server and acts as an interface betwwen the BetterForms Cloud and your database. All traffic goes through this file only.

## Requirements <a href="#requirements" id="requirements"></a>

* V20+ FileMaker Server with CWP and XML enabled, V20+ (preferred) for data API Support and auto-routing scripts using Perform Script by Name.
* CPU powerful enough to handle all script requests, typically your existing FMS box is more than adequate.
* Fast connection to your FMS box, data-center hosted files are recommended.
* **Base Elements Plugin** _(for integration only, not required on server)_ you can [download it here](https://docs.baseelementsplugin.com/article/522-downloads).
