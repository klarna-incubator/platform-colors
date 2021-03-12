const cli = (config, args, callback = (x) => x) => {
  const yargs = require('yargs');

  const yargsBase = args ? yargs(args) : yargs;
  const chain = yargsBase
    .usage(`Usage: ${config.name} <command> [options]`)
    .wrap(Math.min(120, yargs.terminalWidth()));
  callback(chain);
  return chain.strict().help('help').alias('help', 'h').argv;
};

module.exports = cli;
