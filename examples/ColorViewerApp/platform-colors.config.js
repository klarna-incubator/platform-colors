module.exports = {
  colors: {
    primary: {
      light: '#000000',
      dark: '#ffffff',
    },
    accent: 'red',
    contrasted: {
      light: '#ccc',
      highContrastLight: '#fff',
      dark: '#333',
      highContrastDark: '#000',
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
};
