class RegistrationModal {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('app-signup-modal');
    this.title = this.modal.locator('.modal-title');
    this.closeBtn = this.modal.locator('button.close');

    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');

    this.nameError = this.nameInput.locator('xpath=following-sibling::div[contains(@class,"invalid-feedback")]');
    this.lastNameError = this.lastNameInput.locator('xpath=following-sibling::div[contains(@class,"invalid-feedback")]');
    this.emailError = this.emailInput.locator('xpath=following-sibling::div[contains(@class,"invalid-feedback")]');
    this.passwordError = this.passwordInput.locator('xpath=following-sibling::div[contains(@class,"invalid-feedback")]');
    this.repeatPasswordError = this.repeatPasswordInput.locator('xpath=following-sibling::div[contains(@class,"invalid-feedback")]');

    this.registerBtn = this.modal.getByRole('button', { name: 'Register' });
  }

  async open() {
    await this.page.locator('app-header button.header_signin').click();
    await this.page.locator('app-signin-modal').waitFor({ state: 'visible' });
    await this.page.locator('app-signin-modal').getByRole('button', { name: 'Registration' }).click();
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

  async triggerBlur(locator) {
    await locator.focus();
    await this.page.keyboard.press('Tab');
  }
}

module.exports = { RegistrationModal };
