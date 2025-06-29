# 1. Configure FileMaker Server & Helper File

This initial part of the guide is essential for laying the groundwork to connect your FileMaker solutions with BetterForms. 

### Requirements
*   FileMaker Server v16+ (v17+ preferred for Data API support)
*   CWP (XML or Data API) enabled on the server
*   A server with adequate CPU and a fast connection (data-center recommended)
*   Base Elements Plugin (only used for the integration script in the Helper file)

### Configuration Steps

1.  **Download the Helper File:** [Get the latest version here](https://www.dropbox.com/sh/o8c1k649qpret5r/AAAYa7hKiOZEgBlSL4vCs6kma?dl=0).
2.  **Change Admin Credentials:** Open the helper file and change the default `admin / admin` credentials to your own secure password.
3.  **Set BetterForms User Password:** Change the password for the **`BetterForms`** user account. This is the password the BetterForms servers will use to connect to this file. **Note this password down**, as you will need it when adding the server to the IDE and when setting up your own application files.
4.  **Upload to Server:** Upload the configured helper file to your FileMaker Server.
5.  **Add Credentials to Your App:** In your own FileMaker application file, create a `BetterForms` user account with the **exact same password** you set in step 3. This account needs a privilege set that allows `Data Entry Only` and has the `fmxml` (for CWP) and/or `fmrest` (for Data API) extended privileges enabled.
6.  **Enable CWP Gateway:** Ensure either the XML Custom Web Publishing gateway or the Data API is enabled on your FileMaker Server. For FMS 17+, enabling the XML gateway must be done via the [command line](http://docs.360works.com/index.php/Enable_XML_FileMaker_17).

{% hint style="warning" %}
You must have a valid TLS certificate installed on your FileMaker Server to use the Data API.
{% endhint %}
