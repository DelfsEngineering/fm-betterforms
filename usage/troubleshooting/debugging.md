# Debugging

### Start at the Helper File

The helper file is typically your first place to start your debugging. Every hook script call will have a record entry. If it does not then the issue is before the FMS.

 

<table>
  <thead>
    <tr>
      <th style="text-align:left">Symptom</th>
      <th style="text-align:left">Possible Causes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">No Helper File record for any hooks</td>
      <td style="text-align:left">
        <ul>
          <li>Credentials in the BF app do not match</li>
          <li>Incorrect Server Settings</li>
        </ul>
        <p></p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Hook Runs from the helper file but not from web</td>
      <td style="text-align:left">
        <ul>
          <li>Access priv of the BetterForms user vs your admin creds.</li>
          <li>A script step you are running is not supported by CWP. Note CWP script
            engine is not the same as the FMS PSOS script engine.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

