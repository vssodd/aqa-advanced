class GaragePage {
  constructor(page) {
    this.page = page;
  }

  get url() {
    return '/panel/garage';
  }

  get heading() {
    return this.page.locator('.panel-page_heading').first();
  }

  get addCarButton() {
    return this.page.getByRole('button', { name: 'Add car' });
  }

  get carItems() {
    return this.page.locator('app-car');
  }

  get signInButton() {
    return this.page.locator('app-header button.header_signin');
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForURL(/\/panel\/garage/, { timeout: 15000 });
  }
}

module.exports = { GaragePage };
