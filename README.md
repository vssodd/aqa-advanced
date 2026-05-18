# DZ_16 — Registration & Login E2E Tests

Cypress + JavaScript test suite for `https://qauto.forstudy.space` covering:
1. Registration form validation (positive + negative).
2. Custom `cy.login(email, password)` command performing UI login.
3. Overridden `cy.type(..., { sensitive: true })` that masks passwords in Cypress logs.

## Project structure

```
.
├─ cypress.config.js
├─ cypress.env.json                     -- Basic Auth creds (guest / welcome2qauto)
├─ package.json
├─ .gitignore
└─ cypress/
   ├─ e2e/
   │  ├─ registration.cy.js             -- positive + negative registration scenarios
   │  ├─ login.cy.js                    -- register -> logout -> cy.login() flow
   │  └─ password-masking.cy.js         -- verifies type({sensitive:true}) override
   ├─ support/
   │  ├─ e2e.js                         -- global config + uncaught exception guard
   │  └─ commands.js                    -- visitWithAuth, login, type override
   └─ helpers/
      ├─ BaseURL.js
      ├─ HeaderPage.js
      ├─ RegistrationPage.js            -- Page Object for signup modal
      └─ userFactory.js                 -- generateUser() with unique email
```

## Install

```bash
npm install
```

## Run (UI mode — required by the task)

```bash
npm run cy:open
```

Then choose **E2E Testing -> Chrome -> Start E2E Testing** and run each spec:
- `registration.cy.js`
- `login.cy.js`
- `password-masking.cy.js`

## Run headless

```bash
npm run cy:run                 # all specs
npm run cy:run:registration
npm run cy:run:login
npm run cy:run:masking
```

## Registration validation rules (verified against the SUT)

| Field             | Rule                                                                                          |
|-------------------|-----------------------------------------------------------------------------------------------|
| Name              | required, 2..20 chars                                                                         |
| Last name         | required, 2..20 chars                                                                         |
| Email             | required, valid format                                                                        |
| Password          | required, 8..15 chars, >=1 digit, >=1 uppercase, >=1 lowercase                                |
| Re-enter password | required, must match Password                                                                 |
| Register button   | disabled while any rule is violated                                                           |

## Unique email strategy

`cypress/helpers/userFactory.js#generateUser()` builds an email as:

```
qauto_<timestamp>_<5char_random>@test-mail.com
```

This guarantees no collisions on the shared learning environment.

## Custom commands

### `cy.visitWithAuth(path)`
Visits a path with HTTP Basic Auth credentials from `cypress.env.json`.

### `cy.login(email, password)`
Opens Sign In modal, types credentials (password masked), submits, waits for `/panel/*`.

### `cy.type(text, { sensitive: true })`
Overridden built-in: when `sensitive: true`, replaces the cleartext log message
with `*` of the same length, never exposing the password in Cypress logs or screenshots.

Example:
```js
cy.get('#password').type('superSecret123', { sensitive: true });
```
