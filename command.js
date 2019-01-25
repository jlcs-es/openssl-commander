const { spawnSync } = require('child_process');

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

function checkOpenSSLError(args, result) {
    const expectedStderr = expectedStderrForAction[args[0]];
    if (expectedStderr && !(expectedStderr instanceof RegExp)) {
        expectedStderr = expectedStderr[args[1]];
    }
    if (result.status || (result.stderr && expectedStderr && !result.stderr.toString().match(expectedStderr))) {
        throw new Error(result.stderr.toString());
    }
}


class Command {

    constructor() {
        this._stdin = "";
    }

    cmd(...params) {
        this._command = "openssl";
        if (params.length == 1)
            this._args = params[0].split(" ");
        else
            this._args = params;

        // exec() ONLY EXISTS AFTER cmd() IS CALLED
        this.exec = function (throwOnOpenSSLError) {
            let result = spawnSync(this._command, this._args, { input: this._stdin });
            if (result.error)
                throw result.error;
            if (throwOnOpenSSLError) {
                checkOpenSSLError(this._args, result);
            }
            return new Executed(result);
        }

        return this;
    }

    stdin(input) {
        this._stdin = input;
        return this;
    }

}


class Executed extends Command {

    constructor(spawned) {
        super();
        this._stdout = spawned.stdout;
        this._stderr = spawned.stderr;
        this._status = spawned.status;
        this._stdin = this._stdout.toString(); // PIPE
        delete this.stdin; // DON'T ALLOW PIPE REWRITE
        delete this.exec; // exec() ONLY EXISTS AFTER cmd() IS CALLED
    }

    get status() {
        return this._status;
    }

    get stdout() {
        return this._stdout.toString();
    }

    get rawstdout() {
        return this._stdout;
    }

    get stderr() {
        return this._stderr.toString();
    }

    get rawstderr() {
        return this._stderr;
    }

    get pipe() {
        return this; // This is just a syntax aid
    }

}

module.exports = { Command, Executed };
