import { loginPage, misListasPage } from '../fixtures';

describe('buscalibre', () => {
  it('should write the prices', () => {
    cy.visit('https://www.buscalibre.com.co/v2/u');
    loginPage.login(Cypress.env('username'), Cypress.env('password'));
    misListasPage.getData();
    misListasPage.writeData();
  });
});
