export default class GaragePage {
  static PATH = '/panel/garage';

  visit() {
    cy.visit(GaragePage.PATH);
    this.title.should('exist');
    return this;
  }
  get title() {
    return cy.contains('h1, h2, .panel-page_heading', 'Garage');
  }

  get btn_add_car() {
    return cy.contains('button', 'Add car');
  }
  get car_items() {
    return cy.get('.car-item, app-car');
  }
  carByTitle(brandModel) {
    return cy.contains('.car-item, app-car', brandModel);
  }
  openAddCarModal() {
    this.btn_add_car.click();
    cy.get('app-add-car-modal').should('be.visible');
    return this;
  }
}
