Feature: Example feature
  As a technical user I would like to make sure cucumber works with wdio

  Scenario: Reading documentation
    Given I have a web browser
    When I navigate to the server
    Then I should see "Test Data" as the #test-data
