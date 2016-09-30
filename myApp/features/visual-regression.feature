Feature: Visual Regression Test feature
  As a tester I would like to be able to detect visual regressions

  Scenario: Reading documentation
    Given I have a web browser
    When I navigate to the server
    Then The Screenshots Should Match
