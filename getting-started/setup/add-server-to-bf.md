# 3. Add Server to BetterForms IDE

The final setup step is to register your FileMaker Server with the BetterForms IDE and test the connection.

### Registration Steps

1.  Log into the [BetterForms IDE](https://app.fmbetterforms.com/#/servers) and navigate to the **Servers** tab.
2.  Create a new server connection, providing a friendly name and the IP address or Fully Qualified Domain Name (FQDN) of your FileMaker server.
3.  Click the **Test Connection** button to verify that BetterForms can communicate with your server's Data API or XML gateway. You should see a list of the files hosted on your server, including the helper file.

{% hint style="warning" %}
If your FileMaker Server is configured to **Filter databases...**, you will not see the file list immediately. Instead, you will see a `{"messages":[{"code":"9","message":"Insufficient privileges"}]}` error. You must enter the `BetterForms` user credentials you configured previously to see the list of files.
{% endhint %}

### Troubleshooting

*   For FileMaker Server 17+, the XML gateway must be enabled from the command line. See [this guide](http://docs.360works.com/index.php/Enable_XML_FileMaker_17) for instructions.
*   If you have a firewall protecting your server, you may need to whitelist the BetterForms IP addresses. See the [Firewalls & Security](../../security/security.md) page for details.
