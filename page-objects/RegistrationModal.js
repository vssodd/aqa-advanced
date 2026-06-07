class RegistrationModal {
  constructor(page) {
    this.page = page;
  }

  get modal() {
    return this.page.locator('app-signup-modal');
  }

  get title() {
    return this.modal.locator('.modal-title');
  }

  get closeBtn() {
    return this.modal.locator('button.close');
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

  get nameError() {
    return this.nameInput.locator('xpath=following-sibling::div[contains(@class,"invalid-feedback")]');
  }

  get lastNameError() {
    return this.lastNameInput.locator('xpath=following-sibling::div[contains(@class,"invalid-feedback")]');
  }

  get emailError() {
    return this.emailInput.locator('xpath=following-sibling::div[contains(@class,"invalid-feedback")]');
  }

  get passwordError() {
    return this.passwordInput.locator('xpath=following-sibling::div[contains(@class,"invalid-feedback")]');
  }

  get repeatPasswordError() {
    return this.repeatPasswordInput.locator('xpath=following-sibling::div[contains(@class,"invalid-feedback")]');
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

  async fill({ name, lastName, email, password, repeatPassword }) {
    if (name !== undefined) await this.nameInput.fill(name);
    if (lastName !== undefined) await this.lastNameInput.fill(lastName);
    if (email !== undefined) await this.emailInput.fill(email);
    if (password !== undefined) await this.passwordInput.fill(password);
    if (repeatPassword !== undefined) await this.repeatPasswordInput.fill(repeatPassword);
  }

  async fillAndSubmit(user) {
    await this.fill({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      repeatPassword: user.repeatPassword ?? user.password,
    });
    await this.registerBtn.click();
  }
}

module.exports = { RegistrationModal };
