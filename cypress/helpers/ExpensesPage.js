export default class ExpensesPage {
  static PATH = '/panel/expenses';

  visit() {
    cy.visit(ExpensesPage.PATH);
    this.title.should('exist');
    return this;
  }
  get title() {
    return cy.contains(/Fuel expenses|Expenses/i);
  }

  get btn_add_expense() {
    return cy.contains('button', 'Add an expense');
  }
  get expense_items() {
    return cy.get('.expense, app-expense, .expense-item, table tbody tr');
  }
  get select_car_filter() {
    return cy.get('#expensesCar');
  }
  openAddExpenseModal() {
    this.btn_add_expense.click();
    cy.get('app-add-expense-modal').should('be.visible');
    return this;
  }
  selectCarOptionContaining(brandModel) {
    this.select_car_filter.find('option').then(($opts) => {
      const target = [...$opts].find((o) => o.textContent && o.textContent.includes(brandModel));
      expect(target, `option containing "${brandModel}"`).to.exist;
      this.select_car_filter.select(target.value);
    });
    return this;
  }
}
