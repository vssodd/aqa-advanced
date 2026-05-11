describe('Homepage', () => {
  it('should open homepage successfully', () => {
    cy.visit('/');
    cy.url().should('include', 'example.com');
  });
});
