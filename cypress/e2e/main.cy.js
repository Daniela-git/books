import { loginPage, misListasPage } from '../fixtures';

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://www.buscalibre.com.co/v2/u');
    loginPage.login(Cypress.env('username'), Cypress.env('password'));
    misListasPage.getData();
    misListasPage.writeData();
  });
});
