import { generateUser } from '../helpers/userFactory.js';
import GaragePage from '../helpers/GaragePage.js';
import AddCarModal from '../helpers/AddCarModal.js';

describe('Garage | add car flow', { testIsolation: false }, () => {
  const garage = new GaragePage();
  const addCar = new AddCarModal();

  before(() => {
    const user = generateUser();
    cy.log(`Test user (env: ${Cypress.env('userPrefix')}): ${user.email}`);
    cy.register(user);
  });

  beforeEach(() => {
    cy.visitWithAuth('/panel/garage');
    cy.location('pathname', { timeout: 15000 }).should('include', '/panel');
  });

  it('opens the Garage page with the Add Car button visible', () => {
    garage.btn_add_car.should('be.visible');
  });

  it('opens the Add Car modal when the button is clicked', () => {
    garage.openAddCarModal();
    addCar.modal_title.should('contain.text', 'Add a car');
    addCar.select_brand.should('be.visible');
    addCar.select_model.should('be.visible');
    addCar.input_mileage.should('be.visible');
  });

  it('successfully adds a new car and shows it in the garage list', () => {
    const carPayload = { brand: 'Audi', model: 'TT', mileage: 12345 };

    garage.openAddCarModal();
    addCar.fillAndSubmit(carPayload);
    garage.carByTitle(`${carPayload.brand} ${carPayload.model}`).should('exist').and('be.visible');
  });
});
