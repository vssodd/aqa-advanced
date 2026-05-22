import BaseURL from '../helpers/BaseURL.js';
describe('Password masking | overridden cy.type({ sensitive: true })', () => {
  let captured = [];
  let originalLog;

  beforeEach(() => {
    cy.visitWithAuth(BaseURL.baseUrl);
    cy.get('app-header header.header button.header_signin').click();
    cy.get('ngb-modal-window app-signin-modal').should('be.visible');
    captured = [];
    originalLog = Cypress.log;
    Cypress.log = function (opts) {
      try {
        captured.push({
          name: opts && opts.name,
          message: opts && opts.message,
        });
      } catch (_) {}
      return originalLog.call(this, opts);
    };
  });

  afterEach(() => {
    if (originalLog) {
      Cypress.log = originalLog;
    }
  });

  it('emits a masked log entry when { sensitive: true } is passed', () => {
    const secret = 'superSecret123';

    cy.get('ngb-modal-window #signinPassword').type(secret, { sensitive: true });

    cy.then(() => {
      const typeLogs = captured.filter((l) => l.name === 'type');
      const maskedLogs = typeLogs.filter(
        (l) => typeof l.message === 'string' && /^\*+$/.test(l.message),
      );

      expect(maskedLogs.length, 'override emitted a masked log entry').to.be.greaterThan(0);
      expect(maskedLogs[0].message.length, 'mask length matches cleartext password length').to.eq(
        secret.length,
      );

      const leaks = captured.filter(
        (l) => typeof l.message === 'string' && l.message.includes(secret),
      );
      expect(leaks, 'cleartext password is NEVER leaked to logs').to.have.length(0);
    });

    cy.get('ngb-modal-window #signinPassword').should('have.value', secret);
  });

  it('does NOT emit a masked override log when { sensitive: true } is omitted', () => {
    const visible = 'PublicValue42';

    cy.get('ngb-modal-window #signinEmail').type(visible);

    cy.then(() => {
      const maskedFromOverride = captured.filter(
        (l) => l.name === 'type' && typeof l.message === 'string' && /^\*+$/.test(l.message),
      );
      expect(
        maskedFromOverride,
        'override does not mask anything when sensitive flag is absent',
      ).to.have.length(0);
    });

    cy.get('ngb-modal-window #signinEmail').should('have.value', visible);
  });
});
