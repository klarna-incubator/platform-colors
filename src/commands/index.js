const generateCmd = require('./generate');
const initCmd = require('./init');

module.exports = (yargs) => {
  const subCommands = [initCmd, generateCmd];

  return subCommands
    .reduce((finalYargs, subCommand) => finalYargs.command(subCommand), yargs)
    .demandCommand(
      1,
      `Missing required command argument. You need to provide one command from: ${subCommands
        .map(({ command }) => command)
        .join(', ')}`
    );
};
