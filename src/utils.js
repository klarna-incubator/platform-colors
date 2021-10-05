const DEFAULT_PREFIX = 'rnpc_';

function prefixColor(name, config) {
  const prefix = config?.prefix || DEFAULT_PREFIX;
  return `${prefix}${name}`;
}

function stringifyColor(color) {
  const hex = color.hex();
  if (hex.length === 9) {
    // Android alpha is the first value, whereas on web it's the last
    return `#${hex.substr(7, 2)}${hex.substr(1, 6)}`;
  }
  return hex;
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
  prefixColor,
  stringifyColor,
  generateDeclaration,
  wrapWithMediaQuery,
  DEFAULT_PREFIX,
};
