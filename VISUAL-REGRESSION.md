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
  return path.join(path.join(__dirname, subFolder));
}

function getScreenshotName(subFolder) {
  var basePath = getScreenshotPath(subFolder);
  return function(context) {
    var type = context.type;
    /**
     * NOTE options.testName *must* be set when checkX methods are run in the
     * step definitions
     **/
    var testName = context.options.testName;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var width = context.meta.width;

    // sets up the complete path name where the screenshot will live
    return path
      .join(basePath, [
        testName, width, type, browserName, browserVersion].join('-') +
        '.png');
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

### Config Summary

The above config sets up a screenshots folder with subfolders called diff,
reference and screen.

- reference is created if it does not exist
- reference holds the "master" screenshots that will be used as the "correct"
output
- screen holds the screenshots generated from the latest test run
- diff holds screenshots that highlight any differences (only exists if 
differences are found)

## Usage


```
module.exports = function () {
  this.Given(/^I have a web browser$/, function () {
    // Express the regexp above with the code you wish you had.
    // `this` is set to a World instance.

    browser.url(this.address);
  });

  this.When(/^I navigate to the server$/, function () {
    // Express the regexp above with the code you wish you had.
    browser.waitForVisible('ion-content', 5000)
  });

  this.Then(/^The Screenshots Should Match$/, function (done) {
    // matching groups are passed as parameters to the step definition

    // the testName could be specified through a variable in the Gherkin
    var testName = 'example';

    var outputs = browser.checkViewport( {
      hide: [],
      remove: [],
      testName: testName, // set the testName so we can match it to the filename
      widths: [320, 1024],
    } );

    failures = outputs.reduce(function(errors, result) {
      /**
       * result: {
       *   misMatchPercentage: number,
       *   isWithinMisMatchTolerance: boolean,
       *   isSameDimensions: boolean,
       *   isExactSameImage: boolean,
       * }
       */
      if (result.isWithinMisMatchTolerance) {
        return errors;
      } else {
        return errors + testName + ' Image Mismatch: ' +
          result.misMatchPercentage + ' ';
      }
    }, '');

    if (failures) {
      done(new Error(failures));
    } else {
      done();
    }
  });
};
```

## Results

The above should produce _reference_ screenshots named:

- screenshots/reference/example-320-viewport-Firefox-47.png
- screenshots/reference/example-1024-viewport-Firefox-47 

The above should also produce _screen_ screenshots named:

- screenshots/screen/example-320-viewport-Firefox-47.png
- screenshots/screen/example-1024-viewport-Firefox-47 

Changing the text in the actual code and re-running the tests will produce 
"diff" images in the `screenshots/diff` folder.

The names of the files are controlled through the config _and_ through passing
a `testName` option when calling the screenshot code 
