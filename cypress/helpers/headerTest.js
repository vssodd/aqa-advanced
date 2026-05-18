export default class Header {
  get header_root() {
    return cy.get('app-header header.header');
  }

  get header_logo() {
    return cy.get('app-header header.header a.header_logo');
  }
  get btn_home() {
    return cy.get('app-header header.header a.header-link[href="/"]');
  }
  get btn_about() {
    return cy.get('app-header header.header button.header-link').contains('About');
  }
  get btn_contact() {
    return cy.get('app-header header.header button.header-link').contains('Contacts');
  }
  get btn_guest_login() {
    return cy.get('app-header header.header button.header-link.-guest');
  }
  get btn_sign_in() {
    return cy.get('app-header header.header button.header_signin');
  }
  get signin_modal() {
    return cy.get('ngb-modal-window app-signin-modal');
  }
  get signin_modal_title() {
    return cy.get('ngb-modal-window app-signin-modal .modal-title');
  }
  get signin_modal_close() {
    return cy.get('ngb-modal-window app-signin-modal button.close');
  }
  get signin_input_email() {
    return cy.get('ngb-modal-window #signinEmail');
  }
  get signin_input_password() {
    return cy.get('ngb-modal-window #signinPassword');
  }
  get about_section() {
    return cy.get('#aboutSection');
  }
  get contacts_section() {
    return cy.get('#contactsSection');
  }
}
