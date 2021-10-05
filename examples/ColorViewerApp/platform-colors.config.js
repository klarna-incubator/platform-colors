module.exports = {
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
  },
  ios: {
    outputDirectory: 'ios/ColorViewerApp/Images.xcassets/',
  },
  android: {
    prefix: 'ColorViewerApp',
    outputDirectory: 'android/app/src/main/res/',
  },
  javascript: {
    typescript: true,
    outputDirectory: 'colors/',
  },
};
