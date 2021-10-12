const generate = require('./android');
const parseColorManifest = require('../parse-color-manifest');
const lightColors = parseColorManifest(require('./fixtures/light-colors.json'));
const darkColors = parseColorManifest(require('./fixtures/dark-colors.json'));

describe('android template', () => {
  it.each([
    ['light', lightColors],
    ['dark', darkColors],
  ])('generates %s colors', (name, colors) => {
    expect(generate(colors)).toMatchSnapshot();
  });
});
