class RegistrationModal {
  constructor(page) {
    this.page = page;
  }

  get modal() {
    return this.page.locator('app-signup-modal');
  }

  get nameInput() {
    return this.page.locator('#signupName');
  }

  get lastNameInput() {
    return this.page.locator('#signupLastName');
  }

  get emailInput() {
    return this.page.locator('#signupEmail');
  }

  get passwordInput() {
    return this.page.locator('#signupPassword');
  }

  get repeatPasswordInput() {
    return this.page.locator('#signupRepeatPassword');
  }

  get registerBtn() {
    return this.modal.getByRole('button', { name: 'Register' });
  }

  get signInButton() {
    return this.page.locator('app-header button.header_signin');
  }

  get signInModal() {
    return this.page.locator('app-signin-modal');
  }

  get registrationLink() {
    return this.signInModal.getByRole('button', { name: 'Registration' });
  }

  async open() {
    await this.signInButton.click();
    await this.signInModal.waitFor({ state: 'visible' });
    await this.registrationLink.click();
    await this.modal.waitFor({ state: 'visible' });
  }

  async fillAndSubmit(user) {
    await this.nameInput.fill(user.name);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.repeatPasswordInput.fill(user.repeatPassword ?? user.password);
    await this.registerBtn.click();
  }
}

module.exports = { RegistrationModal };
