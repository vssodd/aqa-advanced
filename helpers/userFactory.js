const EMAIL_PREFIX = 'aqa-';

function rand(len = 6) {
  return Math.random().toString(36).slice(2, 2 + len);
}

function uniqueEmail(local = 'user') {
  return `${EMAIL_PREFIX}${local}-${Date.now()}-${rand(4)}@test-mail.com`;
}

function validUser(overrides = {}) {
  return {
    name: 'Auto',
    lastName: 'Tester',
    email: uniqueEmail('valid'),
    password: 'Welcome1',
    ...overrides,
  };
}

module.exports = { EMAIL_PREFIX, uniqueEmail, validUser };
