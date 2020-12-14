# Working with environments

THIS IS WORK IN PROGRESS

#### Duplicating FMP files for multiple deployments

Yes, there is an internal ID that is maintained when cloned. You can clear this so you don't have to keep authorizing. See here: [https://fmhelp.filemaker.com/help/18/fmp/en/index.html\#page/FMP\_Help/authorizing-access.html](https://fmhelp.filemaker.com/help/18/fmp/en/index.html#page/FMP_Help/authorizing-access.html)  


```text
A protected file retains its list of authorized files if the file is cloned or included in a runtime solution, so you don't have to repeat this process.
This is helpful because you don't have to repeat the authorization process. However, if you duplicate or clone a protected file, each file will also have the same ID. If you use both files in the same multifile custom app, you must reset the ID in one of the files so that each file has a unique ID. To reset the protected file's unique ID, click Reset All, then click Yes. After resetting, you will need to reauthorize all files that are authorized to access the protected file and any protected files that file was authorized to access.
Important  Resetting the ID cannot be undone by clicking Cancel in the Advanced Security Settings dialog box.
```

