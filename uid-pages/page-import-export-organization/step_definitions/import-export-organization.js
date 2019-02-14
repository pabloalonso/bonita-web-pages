const url = 'build/dist/resources/index.html';

/**
 * Converts Cypress fixtures, including JSON, to a Blob. All file types are
 * converted to base64 then converted to a Blob using Cypress
 * expect application/json. Json files are just stringified then converted to
 * a blob (prevents issues with invalid string decoding).
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 * @return {Promise} Resolves with blob containing fixture contents
 */
function getFixtureBlob(fileUrl, type) {
    return type === 'application/json'
        ? cy
            .fixture(fileUrl)
            .then(JSON.stringify)
            .then(jsonStr => new Blob([jsonStr], { type: 'application/json' }))
        : cy.fixture(fileUrl, 'base64').then(Cypress.Blob.base64StringToBlob)
}

/**
 * Uploads a file to an input
 * @memberOf Cypress.Chainable#
 * @name uploadFile
 * @function
 * @param {String} selector - element to target
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 */
Cypress.Commands.add('uploadFile', (selector, fileUrl, type = '') => {
    return cy.get(selector).then(subject => {
        return getFixtureBlob(fileUrl, type).then(blob => {
            return cy.window().then(win => {
                const el = subject[0]
                const nameSegments = fileUrl.split('/')
                const name = nameSegments[nameSegments.length - 1]
                const testFile = new win.File([blob], name, { type })
                const dataTransfer = new win.DataTransfer()
                dataTransfer.items.add(testFile)
                el.files = dataTransfer.files
                return subject
            })
        })
    })
})

given('I\'m logged', () => {
    cy.server();
    cy.route('GET', 'build/dist/API/system/session/unusedId', 'fixture:loggedUser').as('session');
});

given('I\'m authorized to install organization', () => {
    cy.server();
    cy.route({
        method: 'POST',
        url: 'build/dist/API/services/organization/import',
        status: 200});
});

given('I\'m not authorized to install organization', () => {
    cy.server();
    cy.route({
        method: 'POST',
        url: 'build/dist/API/services/organization/import',
        status: 403
    });
});

given('an error occurred during organization installation', () => {
    cy.server();
    cy.route({
        method: 'POST',
        url: 'build/dist/API/services/organization/import',
        status: 500});
});

given('a file is uploaded', () => {
    cy.server();
    cy.route('POST', 'build/dist/API/formFileUpload', 'fixture:loggedUser').as('postUploadFile');
/*    cy.route({
        method: 'POST',
        url: 'build/dist/API/formFileUpload',
        status: 200,
        response: {organizationDataUpload: 'tempFileName.xml'}
    }).as('postUploadFile');*/
/*    cy.route('POST', '**!/API/formFileUpload', {
        status: 200,
        response: {organizationDataUpload: 'tempFileName.xml'}
    }).as('uploadFile');*/

/*
    cy.fixture('organization.xml').as('organization')
        .get('input[type=file]').then(function(el) {
        return Cypress.Blob.base64StringToBlob(this.organization, 'text/xml')
            .then(blob => {
                console.log(el);
                el[0].files[0] = blob;
                el[0].dispatchEvent(new Event('change', {bubbles: true}));
            })
    });

    cy.upload_file('.file-upload-input', 'organization.xml');
*/
    const fileName = 'organization.xml';
    const fileType = 'text/xml';
    const fileInput = 'input[type=file]';
/*    cy.uploadFile(fileInput, fileName, fileType);
    cy.wait(['@postUploadFile']);*/

    cy.request('POST', 'build/dist/API/formFileUpload');
});

given('No file is selected', () => {
    cy.get('.form-control').should('have.attr','placeholder','Click here to choose your .xml file');
});

when(`I\'m user with {string} bos_local`, (text) => {
    cy.setCookie('BOS_Locale', text);
});

when('I open the import-export organization page', () => {
    cy.server();
    cy.visit(url);
});

when('I click on import button', () => {
    cy.get('button').contains('Install').click({ force: true });
});

then('I can download the file', () => {
    cy.get('pb-link > .text-right > .ng-binding').should('have.attr', 'href', '../API/exportOrganization');
    cy.get('pb-link > .text-right > .ng-binding').should('have.attr', 'target', '_blank');
});

then('I see the "Incorrect extension" message', () => {
    cy.get('.form-control').should('have.attr','placeholder','Incorrect extension');
});

then('I see {string} label on the install button', (text) => {
    cy.get('pb-button > .text-right > .ng-binding').should('have.text', text);
});

then('I see {string} label on the export button', (text) => {
    cy.get('pb-link > .text-right > .ng-binding').should('have.text', text);
});

then('I see the "Install" button being disabled', () => {
    cy.get('pb-button > .text-right > .ng-binding').should('be.disabled');
});

then('I see the success install message', () => {
    cy.get('pb-text > p').contains('Organization successfully installed.');
});

then('I see the server error message', () => {
    cy.get('pb-button > .text-right > .ng-binding').should('have.text', text);
});

then('I see the not authorized message', () => {
    cy.get('pb-button > .text-right > .ng-binding').should('have.text', text);
});

