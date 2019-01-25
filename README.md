# OpenSSL-Commander

## Installing

Via npm:

```bash
$ npm install openssl-commander
```

You also must have OpenSSL installed in your system.


## Intended usage

This wrapper is intended to mimic an OpenSSL command in the terminal.

Import as

```javascript
var openssl = require('openssl-commander');
```

Then write the OpenSSL command as:

```javascript
openssl.cmd("version").exec().stdout
/*
    OpenSSL 1.1.0g  2 Nov 2017
*/
```

You can include standard input before or after the command, always before `exec()`:

```javascript
let myCert = "....";

openssl.stdin(myCert).cmd("x509", "-noout", "-text").exec().stdout
openssl.cmd("x509 -noout -text").stdin(myCert).exec().stdout
```
You may have noticed that the command can be an array of parameters or a single string with the rest of the command.


Also, you can pipe the output of one command to another OpenSSL command:

```javascript
// piping (both accepted)
openssl.cmd("mycommand").exec().pipe.cmd("mycommand2").exec().stdout
openssl.cmd("mycommand").exec().cmd("mycommand2").exec().stdout
```

## TypeScript

This module includes types definitions for your amusement.

