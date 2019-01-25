const { expect } = require('chai');
require('mocha');

const openssl = require('../index');

describe("x509 parsing", () => {
    it('should print the OpenSSL version', () => {
        console.log(openssl.cmd("version").exec().stdout);
    });
});