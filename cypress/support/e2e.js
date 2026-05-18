// Loaded automatically before every spec file.
import './commands';

// Suppress noisy uncaught exceptions originating from the Angular SUT
// (they are not caused by our test logic and would fail the run otherwise).
Cypress.on('uncaught:exception', () => false);
