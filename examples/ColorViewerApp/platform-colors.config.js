module.exports = {
  // prefix: 'example_',
  colors: {
    background: {
      light: '#ffffff',
      dark: '#000000',
    },
    text: {
      light: '#000000',
      dark: '#ffffff',
    },
    accent: 'pink',
    contrasted: {
      light: '#ccc9',
      highContrastLight: '#fff',
      dark: '#3339',
      highContrastDark: '#000',
    },
    errorBackground: {
      light: '#ff0000',
      dark: '#952121',
    },
  },
  ios: {
    outputDirectory: 'ios/ColorViewerApp/Images.xcassets/',
  },
  android: {
    outputDirectory: 'android/app/src/main/res/',
  },
  javascript: {
    typescript: true,
    outputDirectory: 'colors/',
  },
  css: {
    // filename: 'custom.css',
    outputDirectory: 'css/',
  },
};
