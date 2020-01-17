Feature: The failed flow nodes list in desktop resolution

#  Scenario: The failed flow nodes list displays the correct attributes
#    Given The filter response "default filter" is defined
#    When I visit the failed flow nodes list page
#    Then The failed flow nodes list have the correct information

  Scenario: The failed flow nodes list filtered by process name works correctly
    Given The filter response "default filter" is defined
    And The filter response "process name" is defined
    When I visit the failed flow nodes list page
    Then A list of "5" failed flow nodes is displayed
#    When I put "generateRandomCases" in "process name" filter field
#    Then The api call is made for "generateRandomCases"
#    When I put "All processes" in "process name" filter field
#    Then A list of "5" failed flow nodes is displayed
#    When I put "unUsedProcess" in "process name" filter field
#    Then No failed flow nodes are available

#  Scenario: The failed flow nodes list sort by works correctly
#    Given The filter response "default filter" is defined
#    And The filter response "sort by" is defined
#    When I visit the failed flow nodes list page
#    Then A list of "5" failed flow nodes is displayed
#    When I put "Updated - newest first" in "sort by" filter field
#    Then The api call is made for "Updated - newest first"
#    When I put "Updated - oldest first" in "sort by" filter field
#    Then The api call is made for "Updated - oldest first"
#    When I put "Resource name (Asc)" in "sort by" filter field
#    Then The api call is made for "Resource name (Asc)"
#    When I put "Resource name (Desc)" in "sort by" filter field
#    Then The api call is made for "Resource name (Desc)"
#
#  Scenario: Search by resource name works correctly
#    Given The filter response "default filter" is defined
#    And The filter response "search by name" is defined
#    When I visit the failed flow nodes list page
#    Then A list of "5" failed flow nodes is displayed
#    When I put "ApplicationHomeBonita" in "search" filter field
#    Then The api call is made for "ApplicationHomeBonita"
#    When I erase the search filter
#    Then A list of "5" failed flow nodes is displayed
#    When I put "Search term with no match" in "search" filter field
#    Then No failed flow nodes are available
#
#  Scenario: Hide provided failed flow nodes works correctly
#    Given The filter response "default filter" is defined
#    And The filter response "hide provided failed flow nodes" is defined
#    When I visit the failed flow nodes list page
#    Then A list of "5" failed flow nodes is displayed
#    When I filter hide provided failed flow nodes
#    Then The api call is made for "hide provided failed flow nodes"
#
#  Scenario: Load more failed flow nodes button works correctly
#    Given The filter response "enable load more" is defined
#    When I visit the failed flow nodes list page
#    Then A list of "10" failed flow nodes is displayed
#    When I click on Load more failed flow nodes button
#    Then A list of "20" failed flow nodes is displayed
#    When I click on Load more failed flow nodes button
#    Then A list of "30" failed flow nodes is displayed
#    When I click on Load more failed flow nodes button
#    Then A list of "35" failed flow nodes is displayed
#    And The Load more failed flow nodes button is disabled
#
#  Scenario: [Limitation] Load more is not disabled when result is a multiple of count
#    Given The filter response "enable 20 load more" is defined
#    When I visit the failed flow nodes list page
#    Then A list of "10" failed flow nodes is displayed
#    When I click on Load more failed flow nodes button
#    Then A list of "20" failed flow nodes is displayed
#    When I click on Load more failed flow nodes button
#    Then The Load more failed flow nodes button is disabled
#
#  Scenario: Should export a resource
#    Given The filter response "default filter" is defined
#    When I visit the index page
#    Then I can download the resource