module.exports = function () {
  this.Then(/^The Screenshots Should Match$/, function (done) {
    // matching groups are passed as parameters to the step definition

    var testName = 'example';

    var outputs = browser.checkDocument( {
      hide: [],
      remove: [],
      testName: testName,
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
