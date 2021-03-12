module.exports = function generatePlatformColorsConfig(platforms) {
  const config = {
    colors: {
      background: {
        light: '#ffffff',
        dark: '#000000',
      },
      accent: 'pink',
    },
    ios: {
      outputDirectory: 'ios/ColorViewerApp/Images.xcassets/',
    },
    android: {
      outputDirectory: 'android/app/src/main/res/',
    },
    css: {
      outputDirectory: 'static/css/',
    },
    javascript: {
      typescript: true,
      outputDirectory: 'colors/',
    },
  };

  // TODO: depending on platform include

  return JSON.stringify(config, null, 2);
};
