export default class AddCarModal {
  get modal() {
    return cy.get('app-add-car-modal');
  }

  get modal_title() {
    return cy.get('app-add-car-modal .modal-title');
  }

  get modal_close() {
    return cy.get('app-add-car-modal button.close');
  }

  get select_brand() {
    return cy.get('#addCarBrand');
  }

  get select_model() {
    return cy.get('#addCarModel');
  }

  get input_mileage() {
    return cy.get('#addCarMileage');
  }

  get btn_add() {
    return cy.get('app-add-car-modal').contains('button', 'Add');
  }

  get btn_cancel() {
    return cy.get('app-add-car-modal').contains('button', 'Cancel');
  }

  /**
   * @param {{brand:string, model:string, mileage:string|number}} car
   */
  fillAndSubmit({ brand, model, mileage }) {
    this.select_brand.select(brand);
    this.select_model.select(model);
    this.input_mileage.clear().type(String(mileage));
    this.btn_add.click();
    this.modal.should('not.exist');
    return this;
  }
}
