# openssl-commander

## Intended usage

```
openssl.cmd("ec -noout -text").exec().stdout
openssl.cmd("ec", "-noout", "-text").exec().stdout
openssl.stdin("my text").cmd("ec", "-noout").exec().stdout
openssl.cmd("ec", "-noout").stdin("my text").exec().stdout

// piping (both accepted)
openssl.cmd("ec", "-noout").exec().pipe.cmd("ec", "-noout").exec().stdout
openssl.cmd("ec", "-noout").exec().cmd("ec", "-noout").exec().stdout
```
