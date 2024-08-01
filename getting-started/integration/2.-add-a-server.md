# 2. Add your Server to BetterForms

In the [BetterForms IDE](https://app.fmbetterforms.com/#/servers), select the Servers tab and follow the instructions to add your FileMaker server.

All that's needed here is the IP address or FQDN domain name of your FileMaker server (credentials are entered later). Enter a friendly name to be referenced throughout the BetterForms interface.

Once your server is created, click the **Test Connection** button to ensure that the XML gateway or the Data API is properly enabled on your server. You should see the helper file and your business file listed in the results.

{% hint style="info" %}
If your FileMaker server is configured to hide files you do not have access, you will be prompted to enter credentials to show the list of files
{% endhint %}

## Troubleshooting

For FileMaker Server 17, the XML gateway must be enabled from the command line. See [this guide](http://docs.360works.com/index.php/Enable\_XML\_FileMaker\_17) for instructions on that configuration.

If you have strict firewall settings protecting your FileMaker server, see [this page](../../security/security.md).
