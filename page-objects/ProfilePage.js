class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  get url() {
    return '/panel/profile';
  }

  get heading() {
    return this.page.locator('.panel-page_heading').first();
  }

  get displayedName() {
    return this.page.locator('.profile_name').first();
  }

  get editProfileButton() {
    return this.page.getByRole('button', { name: 'Edit profile' });
  }

  async open() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForURL(/\/panel\/profile/, { timeout: 15000 });
  }
}

module.exports = { ProfilePage };
