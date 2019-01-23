const { spawnSync } = require('child_process');

class Command {
    
    constructor() {
        this._stdin = "";
    }

    cmd(...params) {
        this._command = "openssl";
        if(params.length == 1)
            this._args = params[0].split(" ");
        else
            this._args = params;
        
        // exec() ONLY EXISTS AFTER cmd() IS CALLED
        this.exec = function() {
            let result = spawnSync(this._command, this._args, { input: this._stdin });
            if(result.error)
                throw result.error;
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
