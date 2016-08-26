# Visual Regression Example

## Pre-Requisites

- Ionic Starter
- Graphics Magick: http://www.graphicsmagick.org/
- wdio-visual-regression-service:

```
npm install --save-dev wdio-visual-regression-service
```


## Visual Regression Service Setup/Config

https://github.com/zinserjan/wdio-visual-regression-service

Edit the Ionic starter's `wdio.conf.js` and add to the top:

```

var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotPath(subFolder) {
  return path.join(path.join(process.cwd(), subFolder));
}

function getScreenshotName(subFolder) {
  var basePath = getScreenshotPath(subFolder);
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;

    return path
      .join(basePath,
        `${testName}_${type}_${browserName}_v${browserVersion}.png`);
  };
}
```

Then find the `services` attribute in the config and uncomment/add to it so it
has:

```
  services: [
    'visual-regression',
  ],
```

Then finally add a new config property called `visualRegression`:

```
  visualRegression: {
    compare: new VisualRegressionCompare.LocalCompare({
      referenceName: getScreenshotName('reference'),
      screenshotName: getScreenshotName('screen'),
      diffName: getScreenshotName('diff'),
      misMatchTolerance: 0.01,
    }),
    viewportChangePause: 300
  },
```

## Usage


