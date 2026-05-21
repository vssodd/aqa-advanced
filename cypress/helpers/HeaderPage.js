export default class HeaderPage {
  get nav_garage() {
    return cy.get('a[routerlink*="garage"], aside.aside a').contains('Garage');
  }

  get nav_expenses() {
    return cy.get('a[routerlink*="expenses"], aside.aside a').contains('Expenses');
  }
  get nav_my_profile() {
    return cy.contains('My profile');
  }
}
