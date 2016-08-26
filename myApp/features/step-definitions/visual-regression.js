module.exports = function () {
  this.Then(/^The Screenshots Should Match$/, function (done) {
    // matching groups are passed as parameters to the step definition

    // browser.checkViewport([]);
    var output = browser.checkDocument([]);

    console.log('OUTPUT', output);

    if (output[0].isWithinMisMatchTolerance) {
      done();
    } else {
      done(new Error('Screenshots do not match: ' +
        output[0].misMatchPercentage));
    }
  });
};
