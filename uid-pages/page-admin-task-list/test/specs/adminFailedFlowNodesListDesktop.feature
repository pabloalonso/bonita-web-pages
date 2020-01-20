Feature: The failed flow nodes list in desktop resolution

  Scenario: The failed flow nodes list displays the correct attributes
    Given The filter response "default filter" is defined
    When I visit the failed flow nodes list page
    Then The failed flow nodes list have the correct information

#  Scenario: The failed flow nodes list filtered by process name works correctly
#    Given The filter response "default filter" is defined
#    And The filter response "process name" is defined
#    When I visit the failed flow nodes list page
#    Then A list of "5" failed flow nodes is displayed
#    When I put "generateRandomCases (1.0)" in "process name" filter field
#    Then The api call is made for "generateRandomCases (1.0)"
#    When I put "All processes (all versions)" in "process name" filter field
#    Then A list of "5" failed flow nodes is displayed
#    When I put "New vacation request with means of transportation (2.0)" in "process name" filter field
#    Then The api call is made for "New vacation request with means of transportation (2.0)"
#    And No failed tasks are available

  Scenario: The failed flow nodes list sort by works correctly
    Given The filter response "default filter" is defined
    And The filter response "sort by" is defined
    When I visit the failed flow nodes list page
    Then A list of "5" failed flow nodes is displayed
    When I put "Flow node name (Asc)" in "sort by" filter field
    Then The api call is made for "Flow node name (Asc)"
    When I put "Flow node name (Desc)" in "sort by" filter field
    Then The api call is made for "Flow node name (Desc)"
    When I put "Failed on (Newest first)" in "sort by" filter field
    Then The api call is made for "Failed on (Newest first)"
    When I put "Failed on (Oldest first)" in "sort by" filter field
    Then The api call is made for "Failed on (Oldest first)"

  Scenario: Search by name works correctly
    Given The filter response "default filter" is defined
    And The filter response "search by name" is defined
    When I visit the failed flow nodes list page
    Then A list of "5" failed flow nodes is displayed
    When I put "Alowscenario" in "search" filter field
    Then The api call is made for "Alowscenario"
    When I erase the search filter
    Then A list of "5" failed flow nodes is displayed
    When I put "Search term with no match" in "search" filter field
    Then No tasks are available