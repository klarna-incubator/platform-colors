const chroma = require('chroma-js');

const parseColorManifest = (manifest) =>
  Object.keys(manifest).map((name) => {
    const { light, dark, highContrastLight, highContrastDark } =
      typeof manifest[name] === 'string'
        ? { light: manifest[name] }
        : manifest[name];
    return {
      name,
      light: light && chroma(light),
      dark: dark && chroma(dark),
      highContrastLight: highContrastLight && chroma(highContrastLight),
      highContrastDark: highContrastDark && chroma(highContrastDark),
    };
  });

module.exports = parseColorManifest;
