export function generateUser(overrides = {}) {
  const prefix = Cypress.env('userPrefix') || 'aqa';
  const password = Cypress.env('userPassword') || 'Welcome123';
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 7);

  return {
    name: 'Auto',
    lastName: 'Tester',
    email: `${prefix}-${ts}-${rand}@test-mail.com`,
    password,
    ...overrides,
  };
}
