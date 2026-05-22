export default class RegistrationPage {
  get modal() {
    return cy.get('app-signup-modal');
  }
  get modal_title() {
    return cy.get('app-signup-modal .modal-title');
  }
  get modal_close() {
    return cy.get('app-signup-modal button.close');
  }
  get input_name() {
    return cy.get('#signupName');
  }
  get input_lastName() {
    return cy.get('#signupLastName');
  }
  get input_email() {
    return cy.get('#signupEmail');
  }
  get input_password() {
    return cy.get('#signupPassword');
  }
  get input_repeatPassword() {
    return cy.get('#signupRepeatPassword');
  }
  get btn_register() {
    return cy.get('app-signup-modal').contains('button', 'Register');
  }
  get errors_all() {
    return cy.get('app-signup-modal .invalid-feedback');
  }
  errorFor(inputId) {
    return cy.get(`#${inputId}`).parents('.form-group').find('.invalid-feedback');
  }
  open() {
    cy.get('app-header header.header button.header_signin').click();
    cy.get('ngb-modal-window app-signin-modal').should('be.visible');
    cy.get('ngb-modal-window').contains('button', 'Registration').click();
    this.modal.should('be.visible');
    return this;
  }

  /**
   * @param {{name:string, lastName:string, email:string, password:string, repeatPassword?:string}} user
   */
  fill(user) {
    if (user.name !== undefined) this.input_name.clear().type(user.name);
    if (user.lastName !== undefined) this.input_lastName.clear().type(user.lastName);
    if (user.email !== undefined) this.input_email.clear().type(user.email);
    if (user.password !== undefined)
      this.input_password.clear().type(user.password, { sensitive: true });
    const rp = user.repeatPassword !== undefined ? user.repeatPassword : user.password;
    if (rp !== undefined) this.input_repeatPassword.clear().type(rp, { sensitive: true });
    return this;
  }

  submit() {
    this.btn_register.click();
    return this;
  }
}
