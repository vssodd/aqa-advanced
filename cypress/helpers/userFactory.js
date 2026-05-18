/**
 * @param {object} overrides - properties to override (e.g. { password: '...' })
 * @returns {{name: string, lastName: string, email: string, password: string}}
 */

export function generateUser(overrides = {}) {
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 7);
  return {
    name: 'Auto',
    lastName: 'Tester',
    email: `qauto_${ts}_${rand}@test-mail.com`,
    password: 'Welcome123',
    ...overrides,
  };
}
