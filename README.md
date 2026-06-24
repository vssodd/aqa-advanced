# HW 31.1 — Cypress + Playwright в Docker через GitHub Actions

Workflow `.github/workflows/main.yaml` запускает два job-а внутри Docker-контейнеров на GitHub Actions runner-е.

## Завдання 1: Cypress in Docker

- **Image**: `cypress/browsers:node-20.9.0-chrome-118.0.5993.88-1-ff-118.0.2-edge-118.0.2088.46-1`
- **Browser**: Chrome 118
- **Tests**: `cypress/e2e/smoke.cy.js` (2 smoke-теста на доступность qauto)

## Завдання 2: Playwright in Docker

- **Image**: `mcr.microsoft.com/playwright:v1.39.0-jammy`
- **Tests**: `tests/smoke.spec.js` (2 smoke-теста на доступность qauto)

## Структура

```
DZ_26/
├── .github/workflows/main.yaml      ← workflow definition
├── package.json                     ← cypress + @playwright/test
├── cypress.config.js
├── playwright.config.js
├── cypress/
│   ├── e2e/smoke.cy.js
│   └── support/e2e.js
└── tests/
    └── smoke.spec.js
```

## Локальный запуск (для верификации перед пушем)

### Cypress

```
npm install
npx cypress run --browser chrome
```

### Playwright

```
npm install
npx playwright install chromium
npx playwright test
```

## CI запуск

1. `git push` в любую ветку `DZ_*` или `main`.
2. На GitHub: вкладка **Actions** → workflow "E2E Tests in Docker".
3. Дождаться зелёных галочек у обоих job-ов.

## Что нужно сдать преподавателю

- Ссылка на PR с этим workflow.
- Скриншот успешного прогона из вкладки Actions (видны зелёные галочки у `cypress-tests` и `playwright-tests`).
