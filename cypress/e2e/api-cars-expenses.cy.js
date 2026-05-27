import { generateUser } from '../helpers/userFactory.js';
import GaragePage from '../helpers/GaragePage.js';
import AddCarModal from '../helpers/AddCarModal.js';
import ExpensesPage from '../helpers/ExpensesPage.js';

describe('API + UI | car interception, cars list, expense via API, UI validation', { testIsolation: false }, () => {
  const garage = new GaragePage();
  const addCar = new AddCarModal();
  const expenses = new ExpensesPage();

  const carPayload = { brand: 'Audi', model: 'TT', mileage: 12345 };
  const expensePayload = {
    reportedAt: new Date().toISOString().slice(0, 10),
    mileage: carPayload.mileage + 500,
    liters: 35,
    totalCost: 99,
    forceMileage: false,
  };

  let carId;
  let createdCarResponse;

  before(() => {
    const user = generateUser();
    cy.log(`Test user (env: ${Cypress.env('userPrefix')}): ${user.email}`);
    cy.register(user);
  });

  it('UI: creates a car and captures id from POST /api/cars interception', () => {
    cy.intercept('POST', '**/api/cars').as('createCar');

    cy.visitWithAuth('/panel/garage');
    cy.location('pathname', { timeout: 15000 }).should('include', '/panel/garage');

    garage.openAddCarModal();
    addCar.fillAndSubmit(carPayload);

    cy.wait('@createCar').then(({ response }) => {
      expect(response.statusCode, 'POST /api/cars status').to.eq(201);
      expect(response.body, 'response envelope').to.have.property('status', 'ok');
      expect(response.body.data, 'response data').to.be.an('object');
      expect(response.body.data).to.have.property('id');
      expect(response.body.data.mileage).to.eq(carPayload.mileage);

      carId = response.body.data.id;
      createdCarResponse = response.body.data;
      cy.wrap(carId).as('carId');
      cy.log(`Created carId: ${carId}`);
    });

    garage.carByTitle(`${carPayload.brand} ${carPayload.model}`)
      .should('exist')
      .and('be.visible');
  });

  it('API: GET /api/cars returns the list containing the created car', () => {
    cy.getCarsApi().then((res) => {
      expect(res.status, 'GET /api/cars status').to.eq(200);
      expect(res.body).to.have.property('status', 'ok');
      expect(res.body.data).to.be.an('array').and.not.empty;

      const created = res.body.data.find((c) => c.id === carId);
      expect(created, `car with id ${carId} present in list`).to.exist;
      expect(created.mileage, 'mileage matches UI input').to.eq(carPayload.mileage);
      expect(created.brand, 'brand matches UI input').to.eq(carPayload.brand);
      expect(created.model, 'model matches UI input').to.eq(carPayload.model);
      if (createdCarResponse) {
        expect(created.carBrandId).to.eq(createdCarResponse.carBrandId);
        expect(created.carModelId).to.eq(createdCarResponse.carModelId);
      }
    });
  });

  it('API: creates an expense via custom command createExpenseApi using saved carId', () => {
    expect(carId, 'carId from interception').to.be.a('number');
    const payload = { ...expensePayload, carId };

    cy.createExpenseApi(payload).then((res) => {
      expect(res.status, 'POST /api/expenses status').to.eq(200);
      expect(res.body).to.have.property('status', 'ok');
      expect(res.body.data, 'response data').to.be.an('object');
      expect(res.body.data).to.have.property('id');
      expect(res.body.data.carId).to.eq(carId);
      expect(res.body.data.mileage).to.eq(payload.mileage);
      expect(res.body.data.liters).to.eq(payload.liters);
      expect(res.body.data.totalCost).to.eq(payload.totalCost);
    });
  });

  it('UI: finds the car on Expenses page and validates the created expense', () => {
    cy.visitWithAuth('/panel/expenses');
    cy.location('pathname', { timeout: 15000 }).should('include', '/panel/expenses');

    expenses.title.should('exist');

    cy.contains(`${carPayload.brand} ${carPayload.model}`, { timeout: 10000 })
      .should('be.visible');

    cy.contains(String(expensePayload.totalCost), { timeout: 10000 }).should('be.visible');
    cy.contains(String(expensePayload.mileage)).should('be.visible');
    cy.contains(String(expensePayload.liters)).should('be.visible');
  });
});
