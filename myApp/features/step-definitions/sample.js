module.exports = function () {
  this.Given(/^I have a web browser$/, function () {
    // Express the regexp above with the code you wish you had.
    // `this` is set to a World instance.

    browser.url(this.address);
  });

  this.When(/^I navigate to the server$/, function () {
    // Express the regexp above with the code you wish you had.
    browser.waitForVisible('#test-welcome', 5000)
  });

  this.Then(/^I should see "(.*)" as the #test-data$/, function (data, done) {
    // matching groups are passed as parameters to the step definition

    var testData = browser.getText('#test-data');

    if (data === testData) {
      done();
    } else {
      done(new Error('Expected to be on page with #test-data ' + data + 
        ' got "' + testData + '"'));
    }

  });
};
