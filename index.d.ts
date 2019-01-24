
export declare function cmd(params: string | string[]): Command;

export declare function stdin(input: string): Command;

declare class Command {
    constructor() {
        
    }

    cmd(params: string | string[]): Command;
    exec(): Executed;
    stdin(input: string): Command;

}

declare class Executed extends Command {
    constructor() {};

    status: number;
    stdout: string;
    rawstdout: Buffer;
    stderr: string;
    rawstderr: Buffer;
    pipe: Executed;

}