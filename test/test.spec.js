const { expect } = require('chai');
require('mocha');

const openssl = require('../index.js');

var testCertificate =
'-----BEGIN CERTIFICATE-----\n' +
'MIIGLzCCBdagAwIBAgIQH3be7EHzH3zHdBvhyXC4wDAKBggqhkjOPQQDAjCBkjEL\n' +
'MAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4GA1UE\n' +
'BxMHU2FsZm9yZDEaMBgGA1UEChMRQ09NT0RPIENBIExpbWl0ZWQxODA2BgNVBAMT\n' +
'L0NPTU9ETyBFQ0MgRG9tYWluIFZhbGlkYXRpb24gU2VjdXJlIFNlcnZlciBDQSAy\n' +
'MB4XDTE1MDkyNjAwMDAwMFoXDTE1MTIzMDIzNTk1OVowazEhMB8GA1UECxMYRG9t\n' +
'YWluIENvbnRyb2wgVmFsaWRhdGVkMSEwHwYDVQQLExhQb3NpdGl2ZVNTTCBNdWx0\n' +
'aS1Eb21haW4xIzAhBgNVBAMTGnNuaTMzMjgwLmNsb3VkZmxhcmVzc2wuY29tMFkw\n' +
'EwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE/VVyjyzoogarRb9sqmpqwwAf+Kh69I9E\n' +
'5NeT/1s9nVjvEzYTnrEN3xqNrzbA/y61AbJ6Yy714OCq1ViAmBuCPaOCBDIwggQu\n' +
'MB8GA1UdIwQYMBaAFEAJYWfwvINxT94SCCxv1NQrdj2WMB0GA1UdDgQWBBT1uV7H\n' +
'fwV8Ca9MxjAiSHOEyE9EVDAOBgNVHQ8BAf8EBAMCB4AwDAYDVR0TAQH/BAIwADAd\n' +
'BgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwTwYDVR0gBEgwRjA6BgsrBgEE\n' +
'AbIxAQICBzArMCkGCCsGAQUFBwIBFh1odHRwczovL3NlY3VyZS5jb21vZG8uY29t\n' +
'L0NQUzAIBgZngQwBAgEwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDovL2NybC5jb21v\n' +
'ZG9jYTQuY29tL0NPTU9ET0VDQ0RvbWFpblZhbGlkYXRpb25TZWN1cmVTZXJ2ZXJD\n' +
'QTIuY3JsMIGIBggrBgEFBQcBAQR8MHowUQYIKwYBBQUHMAKGRWh0dHA6Ly9jcnQu\n' +
'Y29tb2RvY2E0LmNvbS9DT01PRE9FQ0NEb21haW5WYWxpZGF0aW9uU2VjdXJlU2Vy\n' +
'dmVyQ0EyLmNydDAlBggrBgEFBQcwAYYZaHR0cDovL29jc3AuY29tb2RvY2E0LmNv\n' +
'bTCCAnkGA1UdEQSCAnAwggJsghpzbmkzMzI4MC5jbG91ZGZsYXJlc3NsLmNvbYIT\n' +
'Ki4xMDAxY29ja3RhaWxzLmNvbYIRKi4xMDAxbW90ZXVycy5jb22CEiouYWxpZml0\n' +
'emdlcmFsZC5tZYINKi5hbGlrZml0ei5tZYINKi5ib3J1dC5wYXJ0eYINKi5lbGth\n' +
'c3NhLmNvbYIIKi5mcmQubW6CGyouZy1hbmQtYy1lbGVjdHJvbmljcy5jby51a4IJ\n' +
'Ki5naGFjLmRlgg4qLmtub3R0Ym95cy5ldYIaKi5tb250Z29tZXJ5dm9jYWxjb2Fj\n' +
'aC5jb22CDioubW96YWlrLmNvLmlkggsqLm1vemFpay5pZIIKKi5uZXdlci5jY4IW\n' +
'Ki5wZXJzb25hbGl6YXJibG9nLmNvbYIUKi5zd2FnZG9nd2Fsa2luZy5jb22CGSou\n' +
'dGhlZ29sZGVuYW5kY29tcGFueS5jb22CETEwMDFjb2NrdGFpbHMuY29tgg8xMDAx\n' +
'bW90ZXVycy5jb22CEGFsaWZpdHpnZXJhbGQubWWCC2FsaWtmaXR6Lm1lggtib3J1\n' +
'dC5wYXJ0eYILZWxrYXNzYS5jb22CBmZyZC5tboIZZy1hbmQtYy1lbGVjdHJvbmlj\n' +
'cy5jby51a4IHZ2hhYy5kZYIMa25vdHRib3lzLmV1ghhtb250Z29tZXJ5dm9jYWxj\n' +
'b2FjaC5jb22CDG1vemFpay5jby5pZIIJbW96YWlrLmlkgghuZXdlci5jY4IUcGVy\n' +
'c29uYWxpemFyYmxvZy5jb22CEnN3YWdkb2d3YWxraW5nLmNvbYIXdGhlZ29sZGVu\n' +
'YW5kY29tcGFueS5jb20wCgYIKoZIzj0EAwIDRwAwRAIgZzfbzLiht8LIcEwvCKIj\n' +
'xRC5hF3mcVUzAYMTsAp+PWoCIBCaOZvgDR0t7tCijM6o5N3vNHDs0vQbtQkEaQSx\n' +
'/j9A\n' +
'-----END CERTIFICATE-----';

var expectedParse = `Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            1f:76:de:ec:41:f3:1f:7c:c7:74:1b:e1:c9:70:b8:c0
        Signature Algorithm: ecdsa-with-SHA256
        Issuer: C = GB, ST = Greater Manchester, L = Salford, O = COMODO CA Limited, CN = COMODO ECC Domain Validation Secure Server CA 2
        Validity
            Not Before: Sep 26 00:00:00 2015 GMT
            Not After : Dec 30 23:59:59 2015 GMT
        Subject: OU = Domain Control Validated, OU = PositiveSSL Multi-Domain, CN = sni33280.cloudflaressl.com
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:fd:55:72:8f:2c:e8:a2:06:ab:45:bf:6c:aa:6a:
                    6a:c3:00:1f:f8:a8:7a:f4:8f:44:e4:d7:93:ff:5b:
                    3d:9d:58:ef:13:36:13:9e:b1:0d:df:1a:8d:af:36:
                    c0:ff:2e:b5:01:b2:7a:63:2e:f5:e0:e0:aa:d5:58:
                    80:98:1b:82:3d
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Authority Key Identifier: 
                keyid:40:09:61:67:F0:BC:83:71:4F:DE:12:08:2C:6F:D4:D4:2B:76:3D:96

            X509v3 Subject Key Identifier: 
                F5:B9:5E:C7:7F:05:7C:09:AF:4C:C6:30:22:48:73:84:C8:4F:44:54
            X509v3 Key Usage: critical
                Digital Signature
            X509v3 Basic Constraints: critical
                CA:FALSE
            X509v3 Extended Key Usage: 
                TLS Web Server Authentication, TLS Web Client Authentication
            X509v3 Certificate Policies: 
                Policy: 1.3.6.1.4.1.6449.1.2.2.7
                  CPS: https://secure.comodo.com/CPS
                Policy: 2.23.140.1.2.1

            X509v3 CRL Distribution Points: 

                Full Name:
                  URI:http://crl.comodoca4.com/COMODOECCDomainValidationSecureServerCA2.crl

            Authority Information Access: 
                CA Issuers - URI:http://crt.comodoca4.com/COMODOECCDomainValidationSecureServerCA2.crt
                OCSP - URI:http://ocsp.comodoca4.com

            X509v3 Subject Alternative Name: 
                DNS:sni33280.cloudflaressl.com, DNS:*.1001cocktails.com, DNS:*.1001moteurs.com, DNS:*.alifitzgerald.me, DNS:*.alikfitz.me, DNS:*.borut.party, DNS:*.elkassa.com, DNS:*.frd.mn, DNS:*.g-and-c-electronics.co.uk, DNS:*.ghac.de, DNS:*.knottboys.eu, DNS:*.montgomeryvocalcoach.com, DNS:*.mozaik.co.id, DNS:*.mozaik.id, DNS:*.newer.cc, DNS:*.personalizarblog.com, DNS:*.swagdogwalking.com, DNS:*.thegoldenandcompany.com, DNS:1001cocktails.com, DNS:1001moteurs.com, DNS:alifitzgerald.me, DNS:alikfitz.me, DNS:borut.party, DNS:elkassa.com, DNS:frd.mn, DNS:g-and-c-electronics.co.uk, DNS:ghac.de, DNS:knottboys.eu, DNS:montgomeryvocalcoach.com, DNS:mozaik.co.id, DNS:mozaik.id, DNS:newer.cc, DNS:personalizarblog.com, DNS:swagdogwalking.com, DNS:thegoldenandcompany.com
    Signature Algorithm: ecdsa-with-SHA256
         30:44:02:20:67:37:db:cc:b8:a1:b7:c2:c8:70:4c:2f:08:a2:
         23:c5:10:b9:84:5d:e6:71:55:33:01:83:13:b0:0a:7e:3d:6a:
         02:20:10:9a:39:9b:e0:0d:1d:2d:ee:d0:a2:8c:ce:a8:e4:dd:
         ef:34:70:ec:d2:f4:1b:b5:09:04:69:04:b1:fe:3f:40
`;

var testCertificateRequest =
'-----BEGIN CERTIFICATE REQUEST-----\n' +
'MIIC+jCCAeICAQAwgbQxCzAJBgNVBAYTAkRFMRAwDgYDVQQIDAdCYXZhcmlhMRMw\n' +
'EQYDVQQHDApFaWJlbHN0YWR0MSUwIwYDVQQKDBxZRUFIV0hBVD8hIE1pbmVjcmFm\n' +
'dCBzZXJ2ZXJzMRQwEgYDVQQLDAtNYWlsIHN5c3RlbTEcMBoGA1UEAwwTY2hld2Jh\n' +
'Y2NhLnllYWh3aC5hdDEjMCEGCSqGSIb3DQEJARYUcG9zdG1hc3RlckB5ZWFod2gu\n' +
'YXQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDAi9mSsi01EDc3QMCL\n' +
'lreBVzDSsICIc8w4mttgSg+cW/Hl98iDZ/awyv0hEeXLg/rybR42LHCRXyJbiuV8\n' +
'edOGbYN5ODD3di5tOmzjgJm34gmSxuzzZSe6431C9nR0BJaPwGbBoFqBO5MiWD1i\n' +
'Z7Cv3a+xJQO0gN+3PIgSMOGAD608bqJN58ewtqqYY0xM3vQCEcf40TJJc8fv1+a5\n' +
'1BM07s26L0Az5xZeIcWOqBgvBQhY0dI3QEKW5BbQDVA/OFilpbJFqCseosjz0/YG\n' +
'tS46CHGjNuViAcxeJ/IWKRWB3TCd2KhIqaEZLCVTWPqCaQ7CioITgrQW+c/qVCfv\n' +
'to6xAgMBAAGgADANBgkqhkiG9w0BAQsFAAOCAQEAu8gxx8RrQPeWvKJiY3fmTNHg\n' +
'lEDQU2vTPU+56UZEuCVztj1LdmjzFpH6biFa+C2XxkTxfeXc9OakklWlIgfP7b2Y\n' +
'RTObWPcpyDSE+yB79Lhybb4Wr3vASJJWSgwqymp5BjEj0iHeVFzvippvvyPieafr\n' +
'a31cPiG5UbOWOXpeZ73K1qBqmpRglzYouqWPA0D9e9wks71INhPL8wODRha2RZ9M\n' +
'voaVZHsm6NB+WAZzK+wznc1wLs/mVigqfjakU//VXi8opb7hTkH1/8h8Pn5uCFM7\n' +
'3UcTESfcIv3XuKeLXKQEJZtR3PQlWDb+pI7x1iUm7k0Q1KXsYysdUzq/fGTSdw==\n' +
'-----END CERTIFICATE REQUEST-----';

var expectedReqParse = `Certificate Request:
    Data:
        Version: 1 (0x0)
        Subject: C = DE, ST = Bavaria, L = Eibelstadt, O = YEAHWHAT?! Minecraft servers, OU = Mail system, CN = chewbacca.yeahwh.at, emailAddress = postmaster@yeahwh.at
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                RSA Public-Key: (2048 bit)
                Modulus:
                    00:c0:8b:d9:92:b2:2d:35:10:37:37:40:c0:8b:96:
                    b7:81:57:30:d2:b0:80:88:73:cc:38:9a:db:60:4a:
                    0f:9c:5b:f1:e5:f7:c8:83:67:f6:b0:ca:fd:21:11:
                    e5:cb:83:fa:f2:6d:1e:36:2c:70:91:5f:22:5b:8a:
                    e5:7c:79:d3:86:6d:83:79:38:30:f7:76:2e:6d:3a:
                    6c:e3:80:99:b7:e2:09:92:c6:ec:f3:65:27:ba:e3:
                    7d:42:f6:74:74:04:96:8f:c0:66:c1:a0:5a:81:3b:
                    93:22:58:3d:62:67:b0:af:dd:af:b1:25:03:b4:80:
                    df:b7:3c:88:12:30:e1:80:0f:ad:3c:6e:a2:4d:e7:
                    c7:b0:b6:aa:98:63:4c:4c:de:f4:02:11:c7:f8:d1:
                    32:49:73:c7:ef:d7:e6:b9:d4:13:34:ee:cd:ba:2f:
                    40:33:e7:16:5e:21:c5:8e:a8:18:2f:05:08:58:d1:
                    d2:37:40:42:96:e4:16:d0:0d:50:3f:38:58:a5:a5:
                    b2:45:a8:2b:1e:a2:c8:f3:d3:f6:06:b5:2e:3a:08:
                    71:a3:36:e5:62:01:cc:5e:27:f2:16:29:15:81:dd:
                    30:9d:d8:a8:48:a9:a1:19:2c:25:53:58:fa:82:69:
                    0e:c2:8a:82:13:82:b4:16:f9:cf:ea:54:27:ef:b6:
                    8e:b1
                Exponent: 65537 (0x10001)
        Attributes:
            a0:00
    Signature Algorithm: sha256WithRSAEncryption
         bb:c8:31:c7:c4:6b:40:f7:96:bc:a2:62:63:77:e6:4c:d1:e0:
         94:40:d0:53:6b:d3:3d:4f:b9:e9:46:44:b8:25:73:b6:3d:4b:
         76:68:f3:16:91:fa:6e:21:5a:f8:2d:97:c6:44:f1:7d:e5:dc:
         f4:e6:a4:92:55:a5:22:07:cf:ed:bd:98:45:33:9b:58:f7:29:
         c8:34:84:fb:20:7b:f4:b8:72:6d:be:16:af:7b:c0:48:92:56:
         4a:0c:2a:ca:6a:79:06:31:23:d2:21:de:54:5c:ef:8a:9a:6f:
         bf:23:e2:79:a7:eb:6b:7d:5c:3e:21:b9:51:b3:96:39:7a:5e:
         67:bd:ca:d6:a0:6a:9a:94:60:97:36:28:ba:a5:8f:03:40:fd:
         7b:dc:24:b3:bd:48:36:13:cb:f3:03:83:46:16:b6:45:9f:4c:
         be:86:95:64:7b:26:e8:d0:7e:58:06:73:2b:ec:33:9d:cd:70:
         2e:cf:e6:56:28:2a:7e:36:a4:53:ff:d5:5e:2f:28:a5:be:e1:
         4e:41:f5:ff:c8:7c:3e:7e:6e:08:53:3b:dd:47:13:11:27:dc:
         22:fd:d7:b8:a7:8b:5c:a4:04:25:9b:51:dc:f4:25:58:36:fe:
         a4:8e:f1:d6:25:26:ee:4d:10:d4:a5:ec:63:2b:1d:53:3a:bf:
         7c:64:d2:77
`;

describe("x509 parsing", () => {
    it('should print the OpenSSL version', () => {
        let version = openssl.cmd("version").exec().stdout;
        expect(version).to.match(/^OpenSSL\s.+\s+(.){1,2}\s.+\s.+/);
    });
    it('should parse the x509 certificate', () => {
        let cert = openssl.stdin(testCertificate).cmd("x509 -text -noout").exec().stdout;
        expect(cert).to.equal(expectedParse);
    });
    it('should parse the certificate request', () => {
        let req = openssl.stdin(testCertificateRequest).cmd("req -text -noout").exec().stdout;
        expect(req).to.equal(expectedReqParse);
    });
    it('should parse the x509 certificate with extra spaces in the command', () => {
        let cert = openssl.stdin(testCertificate).cmd(" x509  -text  -noout ").exec(true).stdout;
        expect(cert).to.equal(expectedParse);
    });
});

describe("Throwing errors", () => {
    it('should not throw on OpenSSL error', () => {
        let notThrowFcn = function() { openssl.stdin("not a cert").cmd("x509 -text -noout").exec() };
        expect(notThrowFcn).to.not.throw();
    });
    it('should throw on OpenSSL error', () => {
        let notThrowFcn = function() { openssl.stdin("not a cert").cmd("x509 -text -noout").exec(true) };
        expect(notThrowFcn).to.throw().with.property('code', 'OpenSSLError');
    });
});