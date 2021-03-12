const generate = require('./javascript');
const parseColorManifest = require('../parse-color-manifest');
const colors = parseColorManifest(require('./fixtures/light-colors.json'));

const getFileContents = (files, filename) => {
  const file = files.find((file) => file[0] === filename);
  if (!file) {
    throw new Error(`File "${filename}" not present in output`);
  }
  return file[1];
};

const expectFileSnapshot = (config, filename) => {
  const files = generate(colors, config);
  const contents = getFileContents(files, filename);
  expect(contents).toMatchSnapshot();
};

describe('javascript template', () => {
  it('outputs ios implementation if present in config', () => {
    expectFileSnapshot({ ios: {} }, 'index.ios.js');
  });

  it('outputs android implementation if present in config', () => {
    expectFileSnapshot({ android: {} }, 'index.android.js');
  });

  it('outputs type definitions if enabled in config', () => {
    expectFileSnapshot(
      { android: {}, javascript: { typescript: true } },
      'index.d.ts'
    );
  });

  it('outputs web implementation if present in config', () => {
    expectFileSnapshot({ css: {} }, 'index.js');
  });

  it('outputs typescript for web if enabled in config', () => {
    expectFileSnapshot(
      { css: {}, javascript: { typescript: true } },
      'index.ts'
    );
  });
});
