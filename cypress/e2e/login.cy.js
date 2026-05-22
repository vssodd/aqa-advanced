import BaseURL from '../helpers/BaseURL.js';
import RegistrationPage from '../helpers/RegistrationPage.js';
import { generateUser } from '../helpers/userFactory.js';

describe('Login via cy.login() custom command | qauto.forstudy.space', () => {
  const reg = new RegistrationPage();

  it('registers a new user, logs out, then logs in via cy.login() custom command', () => {
    const user = generateUser();
    cy.log(`Test user: ${user.email}`);
    cy.visitWithAuth(BaseURL.baseUrl);
    reg.open();
    reg.fill(user).submit();
    cy.location('pathname', { timeout: 20000 }).should('include', '/panel/garage');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visitWithAuth(BaseURL.baseUrl);
    cy.login(user.email, user.password);
    cy.location('pathname').should('include', '/panel');
    cy.get('app-header').should('contain.text', 'My profile');
  });
});
