const urlPrefix = 'build/dist/';
const url = urlPrefix + 'resources/index.html';
const defaultFilters = '&f=state=failed&d=rootContainerId&d=assigned_id';
const failedFlowNodesUrl = 'API/bpm/flowNode?';
const defaultRequestUrl = urlPrefix + failedFlowNodesUrl + 'c=20&p=0' + defaultFilters;
const processUrl = urlPrefix + 'API/bpm/process?';
const processFilters = 'c=999&p=0&o=displayName ASC';

given("The filter response {string} is defined", (filterType) => {
    cy.server();
    switch (filterType) {
        case 'default filter':
            createRouteWithResponse(defaultRequestUrl, '', 'failedFlowNodes5Route', 'failedFlowNodes5');
            break;
        case 'process name':
            createRouteWithResponse(processUrl, processFilters, 'processesRoute', 'processes', 0, 999);
            createRoute('&f=processId=8617198282405797017', 'generateRandomCasesRoute');
            createRoute('&f=processId=7623202965572839246', 'unUsedProcessRoute');
            break;
        default:
            throw new Error("Unsupported case");
    }

    function createRoute(queryParameter, routeName) {
        cy.route({
            method: 'GET',
            url: defaultRequestUrl + queryParameter,
        }).as(routeName);
    }

    function createRouteWithResponse(url, queryParameter, routeName, response) {
        let responseValue = undefined;
        if (response) {
            cy.fixture('json/' + response + '.json').as(response);
            responseValue = '@' + response;
        }

        cy.route({
            method: 'GET',
            url: url + queryParameter,
            response: responseValue
        }).as(routeName);
    }
});

when("I visit the failed flow nodes list page", () => {
    cy.visit(url);
});

when("I put {string} in {string} filter field", (filterValue, filterType) => {
    switch (filterType) {
        case 'process name':
            selectFilterContentTypeOption(filterValue);
            break;
        case 'sort by':
            selectSortByOption(filterValue);
            break;
        case 'search':
            searchForValue(filterValue);
            break;
        default:
            throw new Error("Unsupported case");
    }

    function selectFilterContentTypeOption(filterValue) {
        switch (filterValue) {
            case 'All processes':
                cy.get('select').eq(0).select('0');
                cy.wait('@generateRandomCasesRoute');
                break;
            case 'generateRandomCases':
                cy.get('select').eq(0).select('1');
                break;
            case 'unUsedProcesses':
                cy.get('select').eq(0).select('2');
                break;
            default:
                throw new Error("Unsupported case");
        }
    }

    function selectSortByOption(filterValue) {
        switch (filterValue) {
            case 'Resource name (Asc)':
                cy.get('select').eq(1).select('0');
                break;
            case 'Resource name (Desc)':
                cy.get('select').eq(1).select('1');
                break;
            case 'Updated - newest first':
                cy.get('select').eq(1).select('2');
                break;
            case 'Updated - oldest first':
                cy.get('select').eq(1).select('3');
                break;
            default:
                throw new Error("Unsupported case");
        }
    }

    function searchForValue(filterValue) {
        cy.get('pb-input input').type(filterValue);
    }
});

then("The failed flow nodes list have the correct information", () => {
    cy.get('.task-item').eq(0).within(() => {
        // Check that the element exist.
        cy.get('.item-label').contains('Priority');
        cy.get('.item-value').contains('Low');
        cy.get('.item-label').contains('Id');
        cy.get('.item-value').contains('60002');
        cy.get('.item-label').contains('Name');
        cy.get('.item-value').contains('ALowScenario');
        cy.get('.item-label').contains('Display name');
        cy.get('.item-value').contains('ALowScenario display name');
        cy.get('.item-label').contains('Type');
        cy.get('.item-value').contains('User task');
        cy.get('.item-label').contains('Failed on');
        cy.get('.item-value').contains('1/16/20 10:13 AM');
        cy.get('.item-label').contains('Case Id');
        cy.get('.item-value').contains('3001');
        cy.get('.item-label').contains('Process name (version)');
        cy.get('.item-value').contains('generateRandomCases (1.0)');
        cy.get('.item-label').contains('Process display name');
        cy.get('.item-value').contains('generateRandomCases display name');
        cy.get('.glyphicon-option-horizontal').should('have.attr', 'title', 'More')
    });
    cy.get('.task-item').eq(1).within(() => {
        // Check that the element exist.
        cy.get('.item-label').contains('Priority');
        cy.get('.item-value').contains('Lowest');
        cy.get('.item-label').contains('Id');
        cy.get('.item-value').contains('60003');
        cy.get('.item-label').contains('Name');
        cy.get('.item-value').contains('A Lowest Scenario');
        cy.get('.item-label').contains('Display name');
        cy.get('.item-value').contains('A Lowest Scenario display name');
        cy.get('.item-label').contains('Type');
        cy.get('.item-value').contains('User task');
        cy.get('.item-label').contains('Failed on');
        cy.get('.item-value').contains('1/16/20 10:13 AM');
        cy.get('.item-label').contains('Case Id');
        cy.get('.item-value').contains('4001');
        cy.get('.item-label').contains('Process name (version)');
        cy.get('.item-value').contains('generateCases (1.0)');
        cy.get('.item-label').contains('Process display name');
        cy.get('.item-value').contains('generateCases display name');
        cy.get('.glyphicon-option-horizontal').should('have.attr', 'title', 'More')
    });
    cy.get('.task-item').eq(2).within(() => {
        // Check that the element exist.
        cy.get('.item-label').contains('Priority');
        cy.get('.item-value').contains('Highest');
        cy.get('.item-label').contains('Id');
        cy.get('.item-value').contains('60004');
        cy.get('.item-label').contains('Name');
        cy.get('.item-value').contains('A Highest Scenario');
        cy.get('.item-label').contains('Display name');
        cy.get('.item-value').contains('A Highest Scenario display name');
        cy.get('.item-label').contains('Type');
        cy.get('.item-value').contains('User task');
        cy.get('.item-label').contains('Failed on');
        cy.get('.item-value').contains('1/16/20 10:13 AM');
        cy.get('.item-label').contains('Case Id');
        cy.get('.item-value').contains('5001');
        cy.get('.item-label').contains('Process name (version)');
        cy.get('.item-value').contains('cases (1.0)');
        cy.get('.item-label').contains('Process display name');
        cy.get('.item-value').contains('Cases display name');
        cy.get('.glyphicon-option-horizontal').should('have.attr', 'title', 'More')
    });
    cy.get('.task-item').eq(3).within(() => {
        // Check that the element exist.
        cy.get('.item-label').contains('Priority');
        cy.get('.item-value').contains('High');
        cy.get('.item-label').contains('Id');
        cy.get('.item-value').contains('60005');
        cy.get('.item-label').contains('Name');
        cy.get('.item-value').contains('A High Scenario');
        cy.get('.item-label').contains('Display name');
        cy.get('.item-value').contains('A High Scenario display name');
        cy.get('.item-label').contains('Type');
        cy.get('.item-value').contains('User task');
        cy.get('.item-label').contains('Failed on');
        cy.get('.item-value').contains('1/16/20 10:13 AM');
        cy.get('.item-label').contains('Case Id');
        cy.get('.item-value').contains('6001');
        cy.get('.item-label').contains('Process name (version)');
        cy.get('.item-value').contains('donotgenerateRandomCases (1.0)');
        cy.get('.item-label').contains('Process display name');
        cy.get('.item-value').contains('Do not generateRandomCases display name');
        cy.get('.glyphicon-option-horizontal').should('have.attr', 'title', 'More')
    });
    cy.get('.task-item').eq(4).within(() => {
        // Check that the element exist.
        cy.get('.item-label').contains('Priority');
        cy.get('.item-value').contains('Normal');
        cy.get('.item-label').contains('Id');
        cy.get('.item-value').contains('60006');
        cy.get('.item-label').contains('Name');
        cy.get('.item-value').contains('A Normal Scenario');
        cy.get('.item-label').contains('Display name');
        cy.get('.item-value').contains('A Normal Scenario display name');
        cy.get('.item-label').contains('Type');
        cy.get('.item-value').contains('User task');
        cy.get('.item-label').contains('Failed on');
        cy.get('.item-value').contains('1/16/20 10:13 AM');
        cy.get('.item-label').contains('Case Id');
        cy.get('.item-value').contains('7001');
        cy.get('.item-label').contains('Process name (version)');
        cy.get('.item-value').contains('donotgenerateCases (1.0)');
        cy.get('.item-label').contains('Process display name');
        cy.get('.item-value').contains('Do not generateCases display name');
        cy.get('.glyphicon-option-horizontal').should('have.attr', 'title', 'More')
    });
});

then("A list of {string} failed flow nodes is displayed", (nbrOfFailedFlowNodes) => {
    cy.get('.task-item').should('have.length', nbrOfFailedFlowNodes);
});