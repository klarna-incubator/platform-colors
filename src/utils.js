const {
  camelCase,
  snakeCase,
  pascalCase,
  paramCase,
  sentenceCase,
} = require('change-case');
const path = require('path');
const fs = require('fs-extra');

const DEFAULT_PREFIX = 'rnpc';

function formatName(platform, config, name = '') {
  const prefix = (config && config.prefix) || DEFAULT_PREFIX;

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

async function generateAndroidFiles(config) {
  await Promise.all([
    fs.ensureFile(
      path.resolve(
        `${config.android.outputDirectory}/values-night/`,
        'colors.xml'
      )
    ),
    fs.ensureFile(
      path.resolve(`${config.android.outputDirectory}/values/`, 'colors.xml')
    ),
  ]);
}

module.exports = {
  formatName,
  generateAndroidFiles,
};
