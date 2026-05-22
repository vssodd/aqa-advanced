import { generateUser } from '../helpers/userFactory.js';
import GaragePage from '../helpers/GaragePage.js';
import AddCarModal from '../helpers/AddCarModal.js';
import ExpensesPage from '../helpers/ExpensesPage.js';
import AddExpenseModal from '../helpers/AddExpenseModal.js';

describe('Expenses | add fuel expense flow', { testIsolation: false }, () => {
  const garage = new GaragePage();
  const addCar = new AddCarModal();
  const expenses = new ExpensesPage();
  const addExpense = new AddExpenseModal();

  const car = { brand: 'Audi', model: 'TT', mileage: 10000 };

  before(() => {
    const user = generateUser();
    cy.log(`Test user (env: ${Cypress.env('userPrefix')}): ${user.email}`);
    cy.register(user);

    garage.openAddCarModal();
    addCar.fillAndSubmit(car);
    garage.carByTitle(`${car.brand} ${car.model}`).should('exist');
  });

  beforeEach(() => {
    cy.visitWithAuth('/panel/expenses');
    cy.location('pathname', { timeout: 15000 }).should('include', '/panel');
  });

  it('opens the Expenses page with the Add an expense button visible', () => {
    expenses.btn_add_expense.should('be.visible');
  });

  it('opens the Add expense modal with all required inputs', () => {
    expenses.openAddExpenseModal();
    addExpense.select_car.should('be.visible');
    addExpense.input_mileage.should('be.visible');
    addExpense.input_liters.should('be.visible');
    addExpense.input_totalCost.should('be.visible');
  });

  it('successfully adds a fuel expense and shows it in the expenses list', () => {
    const initialMileage = Number(car.mileage);
    const uniqueCost = 50 + Math.floor(Math.random() * 900);
    const expensePayload = {
      mileage: initialMileage + 250,
      liters: 30,
      totalCost: uniqueCost,
    };

    expenses.openAddExpenseModal();
    addExpense.fillAndSubmit(expensePayload);
    cy.location('pathname').should('include', '/panel/expenses');
    cy.contains(String(uniqueCost), { timeout: 10000 }).should('be.visible');
  });
});
