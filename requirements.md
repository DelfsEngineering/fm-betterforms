# Requirements

### FMS16

* V16 FileMaker Server with CWP and XML enabled

### Web Server

> Can Use my own web server?

Technically yes, but Don't if you want effortless deployments. For specific intranet application this may be the only option.

Deployment is via \[[https://zeit.co/now\]\(https://zeit.co/now](https://zeit.co/now]%28https://zeit.co/now) "Zeit's Now Service"\)

-What are the server requirements for this setup? I just want to confirm our current off-site server is sufficient  
None, It is stand alone on a Node host and can easily be moved but there should be no need. The server side software will connect to where ever the FMS is located. This allows the software to be easily revisioned \(and rolled back etc\)

###### After building out the application form how difficult is it to add other forms \(i.e. staff application form, staff contract form, field trip permission forms, etc?\) Is this the type of thing we would eventually be able to do on our own?’

Very easy. there are a few ways to do things here. It sounds like emailing a token that the user clicks \(and FMS pre-populates the form is the way to go. But, in this particular case there could be some dev \(dan\) customization needed because of the repopulation of data. I would guess about 2 hours a form.

###### So, they have a FileMaker server on-site and offsite \(since they can’t rely on the internet on-site\). The offsite FM will be used for the forms.

What are the specs needed for it? FM14 and up? Anything special?

Actually it will need v16, but I think you can get away with the dev version as it uses a single connection to the Node software.



What specs would the UBUNTU server need? Low spec Linux server?

None. The deployment system has its own instance and this nothing to set up!



###### Do you think they would be able eventually to create new forms with guidance? they know some FileMaker \(you saw their file\)

Yes, but not right away. This really is just mode code on the server side that will be developed. I am working on a rudimentary UI for now but an end user will need much more.





