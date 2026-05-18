export default class HeaderPage {
  get header_root() {
    return cy.get('app-header header.header');
  }

  get btn_sign_in() {
    return cy.get('app-header header.header button.header_signin');
  }

  get signin_modal() {
    return cy.get('ngb-modal-window app-signin-modal');
  }

  get signin_modal_close() {
    return cy.get('ngb-modal-window app-signin-modal button.close');
  }

  get signin_email() {
    return cy.get('ngb-modal-window #signinEmail');
  }

  get signin_password() {
    return cy.get('ngb-modal-window #signinPassword');
  }

  get signin_submit() {
    return cy.get('ngb-modal-window').contains('button', 'Login');
  }

  get registration_link() {
    return cy.get('ngb-modal-window').contains('button', 'Registration');
  }

  // Authenticated header
  get btn_my_profile() {
    return cy.get('app-header').contains('My profile');
  }
}
