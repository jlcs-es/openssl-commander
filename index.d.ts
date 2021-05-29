export declare function cmd(...params: string[]): Command;

export declare function stdin(input: string): Command;

export declare function setOpennSSLCommand(command: string): void;

declare class Command {
    constructor();

    cmd(...params: string[]): Command;
    exec(throwOnOpenSSLError?: boolean): Executed;
    stdin(input: string): Command;

}

declare class Executed extends Command {
    constructor();

    status: number;
    stdout: string;
    rawstdout: Buffer;
    stderr: string;
    rawstderr: Buffer;
    pipe: Executed;

}