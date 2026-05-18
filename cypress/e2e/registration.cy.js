import BaseURL from '../helpers/BaseURL.js';
import RegistrationPage from '../helpers/RegistrationPage.js';
import { generateUser } from '../helpers/userFactory.js';

describe('Registration | qauto.forstudy.space', () => {
  const reg = new RegistrationPage();

  beforeEach(() => {
    cy.visitWithAuth(BaseURL.baseUrl);
    reg.open();
  });
  context('Modal layout', () => {
    it('opens registration modal with correct title and inputs', () => {
      reg.modal.should('be.visible');
      reg.modal_title.should('have.text', 'Registration');
      reg.input_name.should('be.visible');
      reg.input_lastName.should('be.visible');
      reg.input_email.should('be.visible');
      reg.input_password.should('be.visible').and('have.attr', 'type', 'password');
      reg.input_repeatPassword.should('be.visible').and('have.attr', 'type', 'password');
      reg.btn_register.should('be.visible').and('be.disabled');
    });
  });

  context('Negative: empty required fields', () => {
    it('shows "required" error for each field on blur', () => {
      [
        'signupName',
        'signupLastName',
        'signupEmail',
        'signupPassword',
        'signupRepeatPassword',
      ].forEach((id) => cy.get(`#${id}`).focus().blur());

      reg.errorFor('signupName').should('contain.text', 'Name required');
      reg.errorFor('signupLastName').should('contain.text', 'Last name required');
      reg.errorFor('signupEmail').should('contain.text', 'Email required');
      reg.errorFor('signupPassword').should('contain.text', 'Password required');
      reg.errorFor('signupRepeatPassword').should('contain.text', 'Re-enter password required');
      reg.btn_register.should('be.disabled');
    });
  });

  context('Negative: invalid email format', () => {
    it('shows "Email is incorrect" error', () => {
      reg.input_email.type('invalid-email').blur();
      reg.errorFor('signupEmail').should('contain.text', 'Email is incorrect');
      reg.btn_register.should('be.disabled');
    });
  });

  context('Negative: name length out of 2..20 range', () => {
    it('rejects 1-character name', () => {
      reg.input_name.type('A').blur();
      reg.errorFor('signupName').should('contain.text', '2 to 20 characters long');
    });

    it('rejects 21-character name', () => {
      reg.input_name.type('A'.repeat(21)).blur();
      reg.errorFor('signupName').should('contain.text', '2 to 20 characters long');
    });
  });

  context('Negative: weak password', () => {
    it('rejects password shorter than 8 chars', () => {
      reg.input_password.type('Ab1', { sensitive: true }).blur();
      reg
        .errorFor('signupPassword')
        .should('contain.text', '8 to 15 characters long')
        .and('contain.text', 'one integer')
        .and('contain.text', 'one capital')
        .and('contain.text', 'one small');
    });

    it('rejects password without uppercase letter', () => {
      reg.input_password.type('welcome123', { sensitive: true }).blur();
      reg.errorFor('signupPassword').should('contain.text', 'one capital');
    });

    it('rejects password without lowercase letter', () => {
      reg.input_password.type('WELCOME123', { sensitive: true }).blur();
      reg.errorFor('signupPassword').should('contain.text', 'one small');
    });

    it('rejects password without digit', () => {
      reg.input_password.type('WelcomeAbc', { sensitive: true }).blur();
      reg.errorFor('signupPassword').should('contain.text', 'one integer');
    });
  });

  context('Negative: mismatched passwords', () => {
    it('shows mismatch error and keeps Register disabled', () => {
      const user = generateUser();
      reg.input_name.type(user.name);
      reg.input_lastName.type(user.lastName);
      reg.input_email.type(user.email);
      reg.input_password.type(user.password, { sensitive: true });
      reg.input_repeatPassword.type('Different123', { sensitive: true }).blur();

      reg.errorFor('signupRepeatPassword').should('contain.text', 'do not match');
      reg.btn_register.should('be.disabled');
    });
  });
  context('Positive: successful registration', () => {
    it('registers a new user with unique email and redirects to /panel/garage', () => {
      const user = generateUser();
      cy.wrap(user).as('newUser');
      cy.log(`Registering user: ${user.email}`);

      reg.fill(user);
      reg.btn_register.should('not.be.disabled');
      reg.submit();

      cy.location('pathname', { timeout: 20000 }).should('include', '/panel/garage');
      cy.get('app-header').should('contain.text', 'My profile');
      cy.get('app-garage, .panel-page').should('exist');
    });
  });
});
