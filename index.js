
import { Command } from './command';

function cmd(...args) {
    let c = new Command();
    c.cmd(...args);
    return c;
}

function stdin(input) {
    
}

function tmpin(input) {

}

export default openssl = {cmd, stdin, tmpin};

// USAGE:
/*
openssl.cmd("ec", "-noout").exec().stdout
openssl.stdin("my text").cmd("ec", "-noout").exec().stdout
// piping (both accepted)
openssl.cmd("ec", "-noout").exec().cmd("ec", "-noout").stdout
openssl.cmd("ec", "-noout").exec().pipe.cmd("ec", "-noout").stdout
// tmp files
openssl.tmpin("my text").cmd("ec", "-noout").exec().stdout
openssl.cmd("ec", "-noout").exec().tmppipe.cmd("ec", "-noout").stdout
*/
