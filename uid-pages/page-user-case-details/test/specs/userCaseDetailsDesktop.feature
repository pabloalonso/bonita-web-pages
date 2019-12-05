Feature: The user case detail in desktop resolution

  Scenario: The user case detail is able to switch between tabs
    Given The detail of a case is available
    When I visit the case detail page
    Then The general detail of a case is displayed