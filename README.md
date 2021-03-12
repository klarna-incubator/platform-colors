<p align="center"><img src="https://user-images.githubusercontent.com/26433/110946195-e2ba4000-833e-11eb-986f-58992913aa27.png" alt="platform-colors Logo" width="500"></p>
<p align="center">
  <h1 align="center">platform-colors</h1>
  <h3 align="center">Generate platform native colors for iOS, Android & Web</h3>
</p>

[![Build Status][ci-image]][ci-url]
[![License][license-image]][license-url]
[![Developed at Klarna][klarna-image]][klarna-url]

Using colors from the underlying platform primitives is powerful, but maintaining it when targeting multiple platforms is quite cumbersome. This CLI you can generate colors and entrypoint for both iOS, Android, and Web with ease.

Under the hood we are using [`PlatformColor`](https://reactnative.dev/docs/platformcolor) on React Native and [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) on web.

## Features

### Easy to use

Type/JavaScript constants are generated automatically – using it with React/Native is as simple as importing the color name.

### Fast

Using platform colors enables you to change from light/dark mode instantly and without any additional rerenders.

### Accessible

By utilizing the underlying platforms high contrast colors are supported out of the box.

## Usage

```sh
npx @klarna/platform-colors
```

The first time you run the command it will prompt you which platforms you want to generate files for which will create a file with the following format:

```js
// platform-colors.config.js
module.exports = {
  "colors": {
    "background": {
      "light": "#ffffff",
      "dark": "#000000"
    },
    "accent": "pink"
  },
  "javascript": {
    "typescript": true,
    "outputDirectory": "src/colors/"
  },
  "ios": {
    "outputDirectory": "ios/YourApp/Images.xcassets/"
  },
  "android": {
    "outputDirectory": "android/app/src/main/res/"
  },
  "css": {
    "outputDirectory": "static/css/"
  }
};
```

**NOTE:** You need to re-run the command after each change to the config to update the generated files.

Now go ahead and inspect your android, ios and web folders. You should have your color definitions on each platform.

### iOS

React Native 0.63 & 0.64 doesn't pick up new native colors from iOS, so until that is fixed you need to apply [this patch](https://github.com/klarna-incubator/platform-colors/blob/master/examples/ColorViewerApp/patches/react-native%2B0.63.4.patch) using [`patch-package`](https://github.com/ds300/patch-package).

### Configuration

#### `colors`

An object where the key is the color name, and the value is either a string or an object containing `light` and optionally `highContrastLight`, `dark` & `highContrastDark` properties.

Example:

```js
{
  colors: {
    contrasted: {
      light: '#ccc',
      highContrastLight: '#fff',
      dark: '#333',
      highContrastDark: '#000',
    }
  }
}
```

#### `ios`

An object containing `outputDirectory` which should be an `.xcassets` directory.

Example:

```js
{
  ios: {
    outputDirectory: 'ios/YourProject/Assets.xcassets/'
  }
}
```

#### `android`

An object containing `outputDirectory` which should be an Android `res` directory.

Example:
```js
{
  android: {
    outputDirectory: 'android/app/src/main/res/'
  }
}
```

#### `css`

An object containing `outputDirectory` which should be a directory where you store CSS files.

Example:

```js
{
  css: {
    outputDirectory: 'static/css/'
  }
}
```

#### `javascript`

An object containing `outputDirectory` which should be a directory where you store your Type/JavaScript files and `typescript` which is set to `true` if you want the output in TypeScript.

Example:

```js
{
  "javascript": {
    "typescript": true,
    "outputDirectory": "src/colors/"
  }
}
```

## Development Setup

Install dependencies and make sure the tests are working

```sh
yarn install
yarn test
```

### Example App

There's an example React Native App available to test under the examples app.

```sh
cd examples/ColorViewerApp
yarn
pod install --project-directory=ios
```

Running it either on ios or android by:

```sh
yarn ios
```

or

```sh
yarn android
```

#### Screenshots

<img src="https://user-images.githubusercontent.com/378279/110977509-8a953500-8362-11eb-9b79-edfed85e6408.png" width="200" height="433" alt="Screenshot in dark mode" /> <img src="https://user-images.githubusercontent.com/378279/110977517-8cf78f00-8362-11eb-98c2-9b0b634ee327.png" width="200" height="433" alt="Screenshot in dark mode" />

## How to contribute

See our [changelog](CHANGELOG.md).

Copyright © 2021 Klarna Bank AB

For license details, see the [LICENSE](LICENSE) file in the root of this project.

<!-- Markdown link & img dfn's -->

[ci-image]: https://img.shields.io/badge/build-passing-brightgreen?style=flat-square
[ci-url]: https://github.com/klarna-incubator/TODO
[license-image]: https://img.shields.io/badge/license-Apache%202-blue?style=flat-square
[license-url]: http://www.apache.org/licenses/LICENSE-2.0
[klarna-image]: https://img.shields.io/badge/%20-Developed%20at%20Klarna-black?labelColor=ffb3c7&style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAALQAAAAAQAAAtAAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABCgAwAEAAAAAQAAAA4AAAAA0LMKiwAAAAlwSFlzAABuugAAbroB1t6xFwAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAVBJREFUKBVtkz0vREEUhsdXgo5qJXohkUgQ0fgFNFpR2V5ClP6CQu9PiB6lEL1I7B9A4/treZ47c252s97k2ffMmZkz5869m1JKL/AFbzAHaiRbmsIf4BdaMAZqMFsOXNxXkroKbxCPV5l8yHOJLVipn9/vEreLa7FguSN3S2ynA/ATeQuI8tTY6OOY34DQaQnq9mPCDtxoBwuRxPfAvPMWnARlB12KAi6eLTPruOOP4gcl33O6+Sjgc83DJkRH+h2MgorLzaPy68W48BG2S+xYnmAa1L+nOxEduMH3fgjGFvZeVkANZau68B6CrgJxWosFFpF7iG+h5wKZqwt42qIJtARu/ix+gqsosEq8D35o6R3c7OL4lAnTDljEe9B3Qa2BYzmHemDCt6Diwo6JY7E+A82OnN9HuoBruAQvUQ1nSxP4GVzBDRyBfygf6RW2/gD3NmEv+K/DZgAAAABJRU5ErkJggg==
[klarna-url]: https://klarna.github.io
