
const { Command } = require('./command');

function cmd(...args) {
    let c = new Command();
    c.cmd(...args);
    return c;
}

function stdin(input) {
    let c = new Command();
    c.stdin(input);
    return c;
}

module.exports = {cmd, stdin};
