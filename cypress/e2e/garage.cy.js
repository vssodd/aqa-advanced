import { generateUser } from '../helpers/userFactory.js';

describe('Firefox-compatible smoke | qauto garage flow', { testIsolation: false }, () => {
  before(() => {
    const user = generateUser();
    cy.log(`Test user: ${user.email}`);
    cy.register(user);
  });

  it('lands on garage after registration', () => {
    cy.location('pathname').should('include', '/panel/garage');
  });

  it('shows Add car button on garage page', () => {
    cy.visitWithAuth('/panel/garage');
    cy.location('pathname', { timeout: 15000 }).should('include', '/panel/garage');
    cy.contains('button', 'Add car').should('be.visible');
  });

  it('opens Add car modal with brand and model selectors', () => {
    cy.contains('button', 'Add car').click();
    cy.get('app-add-car-modal').should('be.visible');
    cy.get('#addCarBrand').should('be.visible');
    cy.get('#addCarModel').should('be.visible');
    cy.get('#addCarMileage').should('be.visible');
  });
});
