export default class AddExpenseModal {
  get modal() {
    return cy.get('app-add-expense-modal');
  }

  get modal_title() {
    return cy.get('app-add-expense-modal .modal-title');
  }

  get modal_close() {
    return cy.get('app-add-expense-modal button.close');
  }

  get select_car() {
    return cy.get('#addExpenseCar');
  }

  get input_date() {
    return cy.get('#addExpenseDate');
  }

  get input_mileage() {
    return cy.get('#addExpenseMileage');
  }

  get input_liters() {
    return cy.get('#addExpenseLiters');
  }

  get input_totalCost() {
    return cy.get('#addExpenseTotalCost');
  }

  get btn_add() {
    return cy.get('app-add-expense-modal').contains('button', 'Add');
  }

  get btn_cancel() {
    return cy.get('app-add-expense-modal').contains('button', 'Cancel');
  }

  /**
   * @param {{date?:string, mileage:string|number, liters:string|number, totalCost:string|number}} expense
   */
  fillAndSubmit({ date, mileage, liters, totalCost }) {
    this.input_mileage.should(($el) => {
      expect($el.val()).to.not.equal('');
    });

    if (date !== undefined) {
      this.input_date.clear().type(date);
    }
    this.input_mileage.clear().type(String(mileage));
    this.input_mileage.should('have.value', String(mileage));

    this.input_liters.clear().type(String(liters));
    this.input_liters.should('have.value', String(liters));

    this.input_totalCost.clear().type(String(totalCost));
    this.input_totalCost.should('have.value', String(totalCost));

    this.btn_add.click();
    this.modal.should('not.exist');
    return this;
  }
}
