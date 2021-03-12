<p align="center"><img src="https://user-images.githubusercontent.com/26433/110946195-e2ba4000-833e-11eb-986f-58992913aa27.png" alt="platform-colors Logo" width="500"></p>

# platform-colors

> A CLI that generates required files for iOS, Android and Web to access colors on native platform

[![Build Status][ci-image]][ci-url]
[![License][license-image]][license-url]
[![Developed at Klarna][klarna-image]][klarna-url]

Using platform colors is super powerful, but adding colors to different platforms is quite cumbersome, with this CLI you will generate colors and an entry point for both iOS, Android, and Web.

Based on a color manifest (colors.json) this CLI will generate Platform colors for the respective platform.  Using Platform colors enables you to change from light/dark - mode without any additional rerender.

Under the hood we are using [Platform Color](https://reactnative.dev/docs/platformcolor) on React Native and [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) on web.

## Usage

### Getting started

Install using yarn

```sh
yarn add --dev platform-colors
```

or npm

```sh
npm install --save-dev platform-colors
```

Now let's create a json manifest file with the color definitions.

```json
//color-manifest.json
{
  "default": {
    "light": "#000000",
    "dark": "#ffffff"
  },
  "accessible": {
    "light": "#000000",
    "highContrast": "#000000",
    "dark": "#ffffff",
    "highContrastDark": "#ffffff"
  },
  "accent": "#f1f1f1"
}
```

And now let's generate their counterpart platform definitions (ios, android and web by default)

```sh
platform-colors
```

Now go ahead and inspect your android, ios and web folders. You should have your color definitions on each platform.

Want to customize it? Good, keep reading on.

### Configuration

To generate an initial configuration file, go ahead and run:

```sh
platform-colors init
```

This will output a file like this one:

```js
// platform-colors.config.js
module.exports = {
  "colors": require('./src/colors-manifest.json'),
  "ios": {
    "outputDirectory": "ios/Project/Something.xcassets/"
  },
  "android": {
    "outputDirectory": "android/.../main/res/"
      // values/klarna-custompatlfcoo.xml
      /// values-night/klarna-custompatlfcoo.xml
  },
  "css": {
    "outputDirectory": "static/css/"
  },
  "javascript": {
    "outputDirectory": "src/ui/"
  }
}
```
Where:

- colors: the source file four your color definitions (`<root>/color-manifest.json` by default)
- Specify which platforms are you using. We currently support ios | android | css (web) | javascript (js object)
- outputDirectory: refers to the directory you want the generated output for each platform to be placed


## Development Setup

Install dependencies and make sure the tests are working

```sh
yarn install
yarn test
```

### Example App

There's an example React Native App availabe to test under the examples app. 

```sh
cd examples/ColorViewerApp
```

Running it either on ios or android by:

```sh
npx react-natve run-ios
```
or
```sh
npx react-native run-android
```

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
[klarna-url]: https://github.com/klarna-incubator
