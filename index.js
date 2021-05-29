
const { Command } = require('./command');

let opensslCommand = "openssl";

function cmd(...args) {
    let c = new Command(opensslCommand);
    c.cmd(...args);
    return c;
}

function stdin(input) {
    let c = new Command(opensslCommand);
    c.stdin(input);
    return c;
}

function setOpennSSLCommand(command) {
    opensslCommand = command;
}

module.exports = {cmd, stdin, setOpennSSLCommand};
