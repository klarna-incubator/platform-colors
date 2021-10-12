const {
  camelCase,
  snakeCase,
  pascalCase,
  paramCase,
  sentenceCase,
} = require('change-case');

const DEFAULT_PREFIX = 'rnpc';

function formatName(platform, config, name = '') {
  const prefix = config?.prefix || DEFAULT_PREFIX;

  switch (platform) {
    case 'android':
      return `${snakeCase(prefix)}_${snakeCase(name)}`;
    case 'ios':
      return pascalCase(`${prefix}${sentenceCase(name)}`);
    case 'css':
      return `${paramCase(prefix)}-${paramCase(name)}`;
    case 'js':
      return camelCase(prefix);
  }
}

module.exports = {
  formatName,
};
