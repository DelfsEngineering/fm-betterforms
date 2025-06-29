# Updating the Helper File

{% hint style="warning" %}
**Images Needed:** The screenshots for this guide are currently missing. New images need to be captured and added to make these instructions complete.
{% endhint %}

## **Guide to Migrate the Helper File**

Below are the steps for migration and configuration of the helper file. Additionally, we recommend familiarizing yourself with the general documentation, which provides answers to many questions.

[Welcome to FM BetterForms!](../getting-started/welcome-to-fm-betterforms.md)

1. Download the Helper File using [this link](https://www.dropbox.com/scl/fo/mt3zf93tv69rbhg076tsh/AELmLRGbURUC4XmW_72fz28?dl=0&rlkey=5w2gko8a6v241w4666nejpw7y).

<!---->

2. Open the Helper File:

Make sure you have the FileMaker installed and open file use below credentials:

User name : admin

Password : admin

A window will appear, prompting you to set a new password.

3. Change default user and password:

Change the default user and password (admin / admin) to your desired credentials. This password is for file access purposes only and applies solely to this file.

4. Set Up Your Own Account:

* Go to File > Manage > Security

* Click "+New" to create a new account.
* Type the Account Name, set a Password, and select a Privilege Set.
* Click OK to save the new account.

5. Import User Records (If Needed):

* Open FileMaker Pro.
* Open the app where you want to import the existing user records.
* Go to "File" in the menu and select "Import Records."

* Choose the file format of the existing user records (e.g., Excel, CSV, FileMaker Pro file).
* Select the file containing the existing user records and click "Open."

NOTE! ( if your old helper file is located on the server, you can specify the path by clicking the "hosts" button when selecting the file. )

* Map the fields in the import file to the corresponding fields in the app.

Also, make sure that the auto-enter function is turned off.

* Configure any additional import options as needed.
* Preview the import to verify the mappings and data.
* Click the "Import" button to import the existing user records.

At the end, an "Import Summary" window with the results should appear.

6. Configure Helper File:

* Ensure the file is hosted on the server.
* Go to File > Manage > External Data Sources.

* Click "New" in the "Manage External Data Sources" dialog box.

* Click "Add File" in the "Edit Data Source" dialog box.

* Locate and select the new Helper File (click "hosts" if the file is on the server).

* Choose the FileMaker application and click OK > OK > OK.

7. Configure Hooks in Script Workspace:

* Go to Script > Script Workspace.

* Set up Hooks - "Developer - Transmitter - CONFIGURE HERE".

* Type or copy the required items from the previous file and paste them.

* Click on "Betterforms - App - Receiver and Dispatch" to see them on the Specify Script window.

We can see them on the Specify Script window.

We need to replicate the steps we made in the helper file in the FileMaker application.

8. Sync App with Frontend:

(If the file is replaced with the same name, there is no change needed in the BF editor. If not, make sure you use the same credentials.)

* Open the environments list and choose the environment.
* Click the three dots menu > Edit.

Go to Credentials, select the server, and set up HelperFile Name, Account Name, and Password.

(They should be the same as in your helper file)

9. Test Connection:

* Test the connection from frontend to the business file by hitting the API endpoint (e.g., yourapp.com/api).

* Verify if the connection is successful and the records appeared.

10. Test the functionality of your apps.
