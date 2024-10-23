# Updating the Helper File

## **Guide to Migrate the Helper File**

Below are the steps for migration and configuration of the helper file. Additionally, we recommend familiarizing yourself with the general documentation, which provides answers to many questions.

[https://docs.fmbetterforms.com/getting-started/integration](https://docs.fmbetterforms.com/getting-started/integration)

1. Download the Helper File using [this link](https://www.dropbox.com/scl/fo/mt3zf93tv69rbhg076tsh/AELmLRGbURUC4XmW\_72fz28?dl=0\&rlkey=5w2gko8a6v241w4666nejpw7y).

<!---->

2. Open the Helper File:

Make sure you have the FileMaker installed and open file use below credentials:

User name : admin

Password : admin

A window will appear, prompting you to set a new password.

![](https://lh3.googleusercontent.com/0g2C-SaGp6ZK6HycGjD9rZnA39mG0YIapTIzFkSKCJZkzyYBHvylAFhB4BJn6IY7h0h3VYCMCv-xJj8W8anb2w22KFoBSgVcdABiT9GbalrBWXcE1BWpk9RwAB6KegMte1twQGmS3KEU793tD2jujkM)

3. Change default user and password:

Change the default user and password (admin / admin) to your desired credentials. This password is for file access purposes only and applies solely to this file.

4. Set Up Your Own Account:

* Go to File > Manage > Security

![](https://lh6.googleusercontent.com/W9qGn2ltiEBebb8mmaqQX7hZjLZicWVTSX\_6rFn9QKQf4oHMQZtteJZhZ4GVx\_RTOStc72u8mtewJPdjmslMgThPq7KXXUbyGVNVn8udu4uV53\_ghdWt5oz6nqybX1m7GJuYSKP2vbPTQpCJHG\_th4I)

* Click "+New" to create a new account.
* Type the Account Name, set a Password, and select a Privilege Set.
* Click OK to save the new account.

![](https://lh6.googleusercontent.com/rymPxq6YuGaCh331kbgc3EOpRgQ9qYtRXtgNYroBbDgcmSGagHDQMzl8sbkxTYF6UpkhMtkv2wz7LNEvio0eBA8FngxI-kDzv9l5P9Nv6gbOl4ivgRe4BoCk6Tz914IlKWLvxkhidmjdAOFiNd40SK8)

5. Import User Records (If Needed):

* Open FileMaker Pro.
* Open the app where you want to import the existing user records.
* Go to "File" in the menu and select "Import Records."

![](https://lh3.googleusercontent.com/PRrY2Y1PjgWfEiS6VIEKBeSHhWchkr9abldwv8P4bHW9HZ\_cW\_hPoW2Ty0RfvC1mKOaOLzT2qkwyXyLQ8a5KGypiTOs40bgKRe7O\_zQ1DWxpH\_KWO-myLq54vXskTUUYBLmWWSAts0flEdyWxjiIw2U)

* Choose the file format of the existing user records (e.g., Excel, CSV, FileMaker Pro file).
* Select the file containing the existing user records and click "Open."

NOTE! ( if your old helper file is located on the server, you can specify the path by clicking the "hosts" button when selecting the file. )

![](https://lh4.googleusercontent.com/-LMwRl5DLRjIgxBH1cHP0u3d8K9nkw7igs4WMdTQlidtJnv0\_AWaRNVC1EJusvOdcF8dpP\_80krdBNpyZlmjkEc7v7YWqI4\_BrfvN-CEVrLOPAfzR5leJZBLecTlD2T-j2EZWzlMDaB8q3AV4wiFMuY)

* Map the fields in the import file to the corresponding fields in the app.

Also, make sure that the auto-enter function is turned off.

![](https://lh4.googleusercontent.com/pzlc9QLiW1JQwzAY88t-nVy5cqTDd-4n2HKACko0M5C3FnwKzq2cZDIQThooWSa2T\_8RqL8wmf4TlLIG9lrCBTxPARsO-oLoP7jwXzM5rZ-baz5wHgS3wwy4Mp-5mf0CsLXAHmn1i\_lKd5KFR5\_hm5c)

* Configure any additional import options as needed.
* Preview the import to verify the mappings and data.
* Click the "Import" button to import the existing user records.

At the end, an "Import Summary" window with the results should appear.

![](https://lh6.googleusercontent.com/835wu5i5l4eP7oZmc8mYgA5mlKAK3HQn4lXhBdRMLtEEQ\_Dhglxgkg8QibzzdfVuf8qjnfSDuK5NgcRJE-JCfYv7RlA5whFvEvep7nJWKj0E5t5mLlJwPx509Vdq9-IZ8Ig4WLxUktTDTvRfFrCPIWQ)

6. Configure Helper File:

* Ensure the file is hosted on the server.
* Go to File > Manage > External Data Sources.

![](https://lh4.googleusercontent.com/a\_AUP2C61\_exgUTQP7lG5LTkSwI8MuK0AFJDSM4i4tyE9MXocO6v5F-YbEWAcOO0mvSW5\_8UFY66bMyiE0tSsM7ghk9sgj7viXjVpnb5Xxv-NBIL58bCoxqplXnPerUgzFg4gFwehO3kBEj5LJGb0iw)

* Click "New" in the "Manage External Data Sources" dialog box.

![](https://lh6.googleusercontent.com/Wk7r1DjBGIl5K2aVvhATmEpBBR9dFbTj8AjucNPZDylSsAvhng80qNUZ\_5ruSRt3OvkNN0eGqcM96JgAK-IRxcz-\_c2YIEycaRs5TmHeK6i6cKMe-PGPr\_EUuCK63S-RiYnR6i4fl6pVxt0-z\_ChbHU)

* Click "Add File" in the "Edit Data Source" dialog box.

![](https://lh6.googleusercontent.com/1UU4hDpoZ3W6WS8f21JAbcVU4WiL9k0P3T2zSDKO36AwwzYOyhaMviEf1rjbngx9CP1oTxAPG9dJ19e-Jn9N2elgwYYLMO0D3FsE\_cx9j\_sELJZBWhk6b2mc2WgWGmpiXMln2S2vbPqkQAvSdjD9mMc)

* Locate and select the new Helper File (click "hosts" if the file is on the server).

![](https://lh6.googleusercontent.com/WA08htWPGqg4A3jaw9-aWzpG\_o15QFdElr-sD4doEb3Iv1nwsoTX49DyNMSuuIqZLXAzw3ItggpxPRZnYGT5gm7N2u1gMYOE6ADIXZxKe5ODiIWRkcPwcz8TJqjJg1dsI\_HDg1L3xD0XwyH3q67Fq\_w)

* Choose the FileMaker application and click OK > OK > OK.

![](https://lh3.googleusercontent.com/93aUcp9QMgFqw8QlibwdSTrXWxEDv8PdAhAyrzoPWuRNFy6uR-vvEX89cBjfKKsvbF0rcjK\_jBjBc15wBZ8\_ktskxMQJZdKjsD-xzaPk3c53c3Szk02\_g9zPhmleyDovCKKHhrLOJfNEAOCJ9-kzY3g)

![](https://lh6.googleusercontent.com/fVmtMC-z2zVNMRSi3M73Qz\_nduZbA3JxErbQgHfhHiJjindNI7zVRtXuCFfIQ8\_K9nl4UWjFKiMBaITID00cjPCDAKDz\_ivd7sWPvMGINhsx3sD8udci\_aqfZ8DNX-CorF2TPCrrX6cPp7Abp1yuc18)

![](https://lh3.googleusercontent.com/HV7HMUZCxueugfu3QIZl7-XCR31xC3EOLxj0HBGIfjL6jNa8XiMK2RNxlkfQxC7NufqEGkAbnH43c-M-rB16VoK74whz\_JfUIocAAbRuGMGYfPZyYsHN\_vnn9jJDjSMg7mcKfhc-NowEEpw-ym8hu\_w)

7. Configure Hooks in Script Workspace:

* Go to Script > Script Workspace.

![](https://lh6.googleusercontent.com/VAAwEBU1p0\_G2XaSScoUra0E-ImbMXzJ5CRrg1NlAabL72pArPKuE8m3d8ByBtCdSFXUhSHdGU6zSSvyV4oEcVcrb29noeqi9OlyRbzRep-rk4ZVSzUbgOg5pLDRbffhD7nJnBrHkZH3zwEkLdwxkmQ)

* Set up Hooks - “Developer - Transmitter - CONFIGURE HERE”.

![](https://lh3.googleusercontent.com/r-KiwqR4V8D23ZNG0XOZT0DNFGK0ZR8Nsv7yYfv1AxlcB7MmUBDAZXDwd429pATvmY--CBnncXLOjhxUD291ziG9S5tTPkPNqJH6N4j\_A67BTYrBH27Z0CojuAji6cmoG92sAbR0ZHj\_Ev4iQnMEVkU)

* Type or copy the required items from the previous file and paste them.

![](https://lh3.googleusercontent.com/wnsJjr7u10ge9N6VJ9iot32xgSPtXUIMT9T8Re7sQDTBErW3YlgLVBLuRfg5BcRlXvqtkzStxgj04fAr5FSgNqxufmeZZMtlvwPhv1vLT4OvVdn42qtwbkYKTHJnl7VWhZyxKFSbrcxNHcTWrhzaiFU)

![](https://lh3.googleusercontent.com/rMyURKh65MaKINikqmOnt\_rAqnRvYFHbsc-mqk3SBz3D7J588coYczzrRhJfBGjRpf9sndxbgjaNhHKfnVS1YKdQ5CGsp\_\_XeJ6mO-13yQpgEvdCwFYdZ4F9Yd3F5bLltPpDNs3bvR59X0WVf5mVLSQ)

* Click on "Betterforms - App - Receiver and Dispatch" to see them on the Specify Script window.

![](https://lh6.googleusercontent.com/0oUEW4I6kPEhBGpu49onHE-M0iJXiXOM8qUEHoJZ5u9ZAI2qhONY6LTgs\_JiMBSlz9KCrZudxd8fAFOuIRy5kU6QqmGxBtRQgaQBWroa3cTTM5ZBXNnAfqv2RMb7qwkMXwKkntcQfmS0TIkUCNa8mfw)

We can see them on the Specify Script window.

![](https://lh3.googleusercontent.com/sGkaaJx8fu917jv11ZbE7M\_cJqPwsFlud3ZBG4iWmMhfn4xCENfzYa1CmqaXyrtAXd5TCCTH2OZRLWUiOy-M3zgCu49UU3YWPROdw7ak0BGT9tDXeKsXPzoA-8At6rR4xrk-icdKqXGdJbNejCCJWBY)

We need to replicate the steps we made in the helper file in the FileMaker application.

![](https://lh5.googleusercontent.com/RF1hUSahF7B\_WR2nbDTmy7z\_IrNbFlOaOUHCcI0BbZKyPpIeXXzHwV2eOzxuOk2BdV91GCLbyPKMS8vkqRooSgDDHQNu2DlzU0m9zFcSOZx80FIcxF-LgK-2SZmbRJiinIaDwgBbIBFgJbAbGy0Qpjc)

8. Sync App with Frontend:

(If the file is replaced with the same name, there is no change needed in the BF editor. If not, make sure you use the same credentials.)

* Open the environments list and choose the environment.
* Click the three dots menu > Edit.

![](https://lh6.googleusercontent.com/tU714NcHSk8n3EjpneGCyd0Gs2hJ3ZC0Y-mgJZrzQsQcK66UGMafl-YCsiInWcDqgZj2F6gpLfJECMZiw5n3DnAQKMCWLPHG-fMwS2xEVPBclELgRpHV1I660qyphvbU4GcGXFOU-\_xWXWnbwQVNYp4)

Go to Credentials, select the server, and set up HelperFile Name, Account Name, and Password.

(They should be the same as in your helper file)

![](https://lh6.googleusercontent.com/uQtX2vygbIIsi\_RHmVMm8\_7VeQutuekyWGr0ER7i3bg5LqGV3cnG2oJoxJPHZWrijlKXEo3Q3BoHUovhxWK76-NVbQ67NsGh5tMjuKahmrfT1pK5abyTN\_Xr9sRsXhQrTqwe55uhHGEDg3WG4APKmB8)

9. Test Connection:

* Test the connection from frontend to the business file by hitting the API endpoint (e.g., yourapp.com/api).

![](https://lh6.googleusercontent.com/WS\_NtoRRsjPM4MymBWSpAbUPXERSHifRXdsUjReVBkF3niRLYDy0yIFKiwU8cVECm6ecsjwK\_6AjXwzGrHKzkJUf38yIC1JXhUG3O8Snm8EnywTq6LpUKP2IR6zqfk4FRkbEfXKD-pZGrZrpKhLc5Ko)

* Verify if the connection is successful and the records appeared.

![](https://lh3.googleusercontent.com/3qA6SOIB518eHleOjnDeN\_-Vgylmo812NFQMF7wGDeJQ0K27zoS4hRNEdhSEJFtRnyMmebjCudDLVFekL0EYpo0nxgCzAVHRuYgkfNjwwxmcVFagZN-ic7nqXYbAKvYT8uNGXWwKWWe-JSBBJfxzrJY)

10. Test the functionality of your apps.
