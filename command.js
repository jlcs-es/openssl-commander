
export class Command {
    
    constructor() {}

    cmd(...params) {
        this._command = "openssl";
        this._args = params;
    }
    
    stdin() {

    }

    
}

export class Executable extends Command {

    constructor() { super() }

    exec() {

    }
    
}


export class Executed extends Executable {

    constructor() { super() }

    exitCode

    stdout
    
    stderr
    
    cmd() {
    
    }

    get pipe() {

    }

    get tmppipe() {

    }
}
