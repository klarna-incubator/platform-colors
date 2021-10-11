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

const indent = (string) =>
  string
    .split('\n')
    .map((line) => (line.length !== 0 ? `  ${line}` : line))
    .join('\n');

const generateDeclaration = (selector, properties) => `${selector} {
${indent(properties.map(([key, value]) => `${key}: ${value};`).join('\n'))}
}`;

const wrapWithMediaQuery = (mediaQuery, body) =>
  mediaQuery
    ? `@media ${mediaQuery} {
${indent(body)}
}`
    : body;

module.exports = {
  formatName,
  generateDeclaration,
  wrapWithMediaQuery,
};
