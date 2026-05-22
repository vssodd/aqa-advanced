export default class ExpensesPage {
  static PATH = '/panel/expenses';

  visit() {
    cy.visit(ExpensesPage.PATH);
    this.title.should('exist');
    return this;
  }
  get title() {
    return cy.contains('h1, h2, .panel-page_heading', 'Expenses');
  }

  get btn_add_expense() {
    return cy.contains('button', 'Add an expense');
  }
  get expense_items() {
    return cy.get('.expense, app-expense, .expense-item');
  }
  openAddExpenseModal() {
    this.btn_add_expense.click();
    cy.get('app-add-expense-modal').should('be.visible');
    return this;
  }
}
