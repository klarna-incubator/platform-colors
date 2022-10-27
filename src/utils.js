const {
  camelCase,
  snakeCase,
  pascalCase,
  paramCase,
  sentenceCase,
} = require('change-case');

const DEFAULT_PREFIX = 'rnpc';

function getPrefix(config) {
  if (!config || typeof config.prefix !== "string") {
    return DEFAULT_PREFIX
  }
  return config.prefix
}

function formatName(platform, config, name = '') {
  const prefix = getPrefix(config);

  switch (platform) {
    case 'android':
      return prefix ?
        `${snakeCase(prefix)}_${snakeCase(name)}` :
        snakeCase(name);
    case 'ios':
      return prefix ?
        pascalCase(`${prefix}${sentenceCase(name)}`) :
        camelCase(name);
    case 'css':
      return prefix ? 
        `${paramCase(prefix)}-${paramCase(name)}` :
        paramCase(name);
    case 'js':
      return camelCase(prefix);
  }
}

module.exports = {
  formatName,
};
