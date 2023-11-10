class LoginPage {
  userField;
  passwordField;
  confirButton;

  constructor() {
    this.confirButton = ':nth-child(4) > #submit_login';
    this.passwordField = '[id="signin_password"]';
    this.userField = '[id="signin_username"]';
  }

  login(username, password) {
    cy.get(this.userField).type(username, { force: true });
    cy.get(this.confirButton).click({ multiple: true, force: true });
    cy.get(this.passwordField).type(password, { force: true });
    cy.get(this.confirButton)
      .click({ multiple: true, force: true })
      .should('not.exist');
  }
}

export default new LoginPage();
