Feature: The Bonita layout in mobile resolution

  Scenario: The application name should be shown in the menu bar
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    When I visit the index page
    Then The application displayName is "app1" and is shown in the navbar

  Scenario: The burger is opened and closed when clicking the icon two times
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    When I visit the index page
    And I click the burger
    Then I see the dropdown that opened
    When I click the burger
    Then I don't see the dropdown

  Scenario: The Bonita layout shows the user name when a firstname isn't available
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user doesn't have a "firstname" info available
    When I visit the index page
    And I click the burger
    Then I see "walter.bates" as the user name in the dropdown menu

  Scenario: The Bonita layout shows the user name when a lastname isn't available
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user doesn't have a "lastname" info available
    When I visit the index page
    And I click the burger
    Then I see "walter.bates" as the user name in the dropdown menu

  Scenario: The Bonita layout shows the first and last name and not the user name
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    When I visit the index page
    And I click the burger
    Then I see "Walter Bates" as the user name in the dropdown menu
    And I don't see "walter.bates" as the user name in the dropdown menu

  Scenario: The Bonita layout shows the app selection correctly
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    When I visit the index page
    And I click the burger
    Then I see the app selection icon in the dropdown menu

  Scenario: The Bonita layout shows the current session modal
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    When I visit the index page
    And I click the burger
    And I click the user name in dropdown
    Then The current session modal is visible

  Scenario: The current session modal is shown correctly without sso
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    When I visit the index page
    And I click the burger
    And I click the user name in dropdown
    Then The current session modal is visible
    And The user first and last name "Walter Bates" are visible
    And The user name "walter.bates" is shown
    And The user email "walter.bates@email.com" is shown
    And The language select is visible
    And The logout button is visible
    And The save and cancel buttons are visible

  Scenario: The current session modal is shown correctly with sso
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected with sso
    And The user has a first and last name defined
    When I visit the index page
    And I click the burger
    And I click the user name in dropdown
    Then The current session modal is visible
    And The logout button is hidden

  Scenario: The current session modal has the image correctly set
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    When I visit the index page
    And I click the burger
    And I click the user name in dropdown
    Then The current session modal is visible
    And I see "../API/avatars/1" as the user modal icon

  Scenario: The current session modal doesn't show an image
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first, a last name, but no image defined
    When I visit the index page
    And I click the burger
    And I click the user name in dropdown
    Then The current session modal is visible
    And I see "../theme/icons/default/icon_user.png" as the user modal icon


  Scenario: The language is changed in current session modal
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    And I have languages available
    When I visit the index page
    And I click the burger
    And I click the user name in dropdown
    Then The current session modal is visible
    And The save button is disabled
    When I select "Français" in language picker
    Then The save button is enabled
    When I press the save button
    Then The language in BOS_Locale is "fr"

  Scenario: The app selection modal is shown correctly
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And Multiple applications are available for the user
    When I visit the index page
    And I click the burger
    Then I see the dropdown that opened
    When I click the app selection icon in dropdown
    Then The app selection modal is visible
    And I see my apps

  Scenario: The app selection modal filter works correctly
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And Multiple applications are available for the user
    And The filter responses are defined
    And Incorrect name filter response is defined
    When I visit the index page
    And I click the burger
    Then I see the dropdown that opened
    When I click the app selection icon in dropdown
    Then The app selection modal is visible
    When I filter the app selection by "My first"
    Then I see only the filtered applications by "name"
    When I erase the input field
    And I filter the app selection by "app1"
    Then I see only the filtered applications by "token"
    When I erase the input field
    And I filter the app selection by "1.0.5"
    Then I see only the filtered applications by "version"
    When I erase the input field
    And I filter the app selection by "Incorrect name"
    Then I don't see any apps
    And The no app is available text is "No application available using these filters"

  Scenario: The app selection modal closes correctly
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And Multiple applications are available for the user
    When I visit the index page
    And I click the burger
    Then I see the dropdown that opened
    When I click the app selection icon in dropdown
    Then The app selection modal is visible
    When I click the close button
    Then The app selection modal is not visible

  Scenario: The app filter by profile is hidden
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    And Multiple applications are available for the user
    When I visit the index page
    And I click the burger
    Then I see the dropdown that opened
    When I click the app selection icon in dropdown
    Then The app selection modal is visible
    And I don't see the filter dropdown
    And I see my apps

  Scenario: The apps are filtered by the user profile
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    And Multiple applications are available for the user
    And The profiles list is defined
    And The filter responses are defined for the user profile
    When I visit the index page
    And I click the burger
    Then I see the dropdown that opened
    When I click the app selection icon in dropdown
    Then The app selection modal is visible
    And I see the filter dropdown
    And I select the "User" profile in dropdown
    And I see only my user apps

  Scenario: The apps are filtered by the administrator profile
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    And Multiple applications are available for the user
    And The profiles list is defined
    And The filter responses are defined for the administrator profile
    When I visit the index page
    And I click the burger
    Then I see the dropdown that opened
    When I click the app selection icon in dropdown
    Then The app selection modal is visible
    And I see the filter dropdown
    And I select the "Administrator" profile in dropdown
    And I see only my administrator apps

  Scenario: The apps aren't filtered when selecting the all option
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    And Multiple applications are available for the user
    And The profiles list is defined
    And The filter responses are defined for all profiles
    When I visit the index page
    And I click the burger
    Then I see the dropdown that opened
    When I click the app selection icon in dropdown
    Then The app selection modal is visible
    And I see the filter dropdown
    And I select the "All" profile in dropdown
    And I see my apps

  Scenario: The apps are filtered by both user profile and app name
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    And Multiple applications are available for the user
    And The profiles list is defined
    And The filter responses are defined for the administrator profile
    And The response for both administrator profile and app name is defined
    When I visit the index page
    And I click the burger
    Then I see the dropdown that opened
    When I click the app selection icon in dropdown
    Then The app selection modal is visible
    And I see the filter dropdown
    And I select the "Administrator" profile in dropdown
    And I see only my administrator apps
    When I filter the app selection by "My first"
    Then I see only the app with correct profile and name

  Scenario: No app is displayed when the filter is incorrect
    Given The resolution is set to mobile
    And I have the "appName1" application selected
    And A user is connected without sso
    And The user has a first and last name defined
    And Multiple applications are available for the user
    And The profiles list is defined
    And The filter responses are defined for the administrator profile
    And Incorrect name filter response is defined
    When I visit the index page
    And I click the burger
    Then I see the dropdown that opened
    When I click the app selection icon in dropdown
    Then The app selection modal is visible
    And I see the filter dropdown
    And I select the "Administrator" profile in dropdown
    And I see only my administrator apps
    When I filter the app selection by "Incorrect name"
    Then I don't see any apps
    And The no app is available text is "No application available using these filters"