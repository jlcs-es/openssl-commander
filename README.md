# OpenSSL-Commander

## Installing

Via npm:

```bash
$ npm install openssl-commander
```

You also must have OpenSSL installed in your system.

## TypeScript

This module includes types definitions for your amusement.

## Intended usage

This wrapper is intended to mimic an OpenSSL command in the terminal.

Import as

```javascript
const openssl = require('openssl-commander');
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

You can pass a boolean to `exec()` to throw on unexpected OpenSSL errors.

```javascript
let myCert = "....";
openssl.stdin(myCert).cmd("x509", "-noout", "-text").exec(true)
```

> Note: `exec()` will always throw if Node fails to spawn the OpenSSL process.

---

The error detection for the `throwOnOpenSSLError` option of `exec()` is based on `mgcrea/node-openssl-wrapper`'s regex expresions to detect correct executions on some OpenSSL commands and subcommnads.

If you find any new regex, please, fill an issue or pull request.

```javascript
// Credits to mgcrea/node-openssl-wrapper for these regex:
const expectedStderrForAction = {
    'cms': { "verify": /^verification successful/i },
    'genrsa': /^generating/i,
    'pkcs12': /^mac verified ok/i,
    'req': { "new": /^generating/i },
    'req': { "verify": /^verify ok/i },
    'rsa': /^writing rsa key/i,
    'smime': { "verify": /^verification successful/i },
    'x509': { "req": /^signature ok/i }
};
```

