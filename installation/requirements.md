# Requirements

### FMS16

* V16 FileMaker Server with CWP and XML enabled


### Web Server

MISC NOTES FROM EMAILS TO BE CONVERTED TO A README

> Can Use my own web server?

Technically yes, but don't if you want effortless deployments. For specific intranet application this may be the only option.

-What are the server requirements for this setup? I just want to confirm our current off-site server is sufficient  
None, It is stand alone on a Node host and can easily be moved but there should be no need. The server side software will connect to where ever the FMS is located. This allows the software to be easily revisioned \(and rolled back etc\)

> After building out the application form how difficult is it to add other forms \(i.e. staff application form, staff contract form, field trip permission forms, etc?\) Is this the type of thing we would eventually be able to do on our own?’

Very easy. there are a few ways to do things here. It sounds like emailing a token that the user clicks \(and FMS pre-populates the form is the way to go. But, in this particular case there could be some dev customization needed because of the repopulation of data. I would guess about 2 hours a form.

> So, they have a FileMaker server on-site and offsite \(since they can’t rely on the internet on-site\). The offsite FM will be used for the forms. Actually it will need v16, but I think you can get away with the dev version as it uses a single connection to the Node software.

None. The deployment system has its own instance and this nothing to set up!

###### .



