const generate = require('./ios');
const parseColorManifest = require('../parse-color-manifest');
const lightColors = parseColorManifest(require('./fixtures/light-colors.json'));
const darkColors = parseColorManifest(require('./fixtures/dark-colors.json'));
const highContrastColors = parseColorManifest(
  require('./fixtures/high-contrast-colors.json')
);

describe('ios template', () => {
  it.each([
    ['light', lightColors],
    ['dark', darkColors],
    ['high contrast', highContrastColors],
  ])('generates %s colors', (name, colors) => {
    expect(generate(colors)).toMatchSnapshot();
  });
});
