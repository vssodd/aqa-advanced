const { test, expect } = require('@playwright/test');

const validPayload = () => ({
  carBrandId: 1,
  carModelId: 1,
  mileage: 1000 + Math.floor(Math.random() * 9000),
});

test.describe('API | POST /api/cars', () => {
  test('positive: creates a car with valid brand, model and mileage', async ({ request }) => {
    const payload = validPayload();

    const response = await request.post('/api/cars', { data: payload });

    expect(response.status(), 'HTTP 201 Created').toBe(201);

    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.data).toEqual(expect.objectContaining({
      carBrandId: payload.carBrandId,
      carModelId: payload.carModelId,
      mileage: payload.mileage,
    }));
    expect(body.data.id).toBeGreaterThan(0);
  });

  test('negative: missing required carBrandId returns 400', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: { carModelId: 1, mileage: 500 },
    });

    expect(response.status(), 'HTTP 400 Bad Request').toBe(400);

    const body = await response.json();
    expect(body.status).toBe('error');
    expect(body.message).toMatch(/carBrandId|required|brand/i);
  });

  test('negative: non-existing carBrandId returns 404', async ({ request }) => {
    const response = await request.post('/api/cars', {
      data: { carBrandId: 9999, carModelId: 1, mileage: 500 },
    });

    expect([404, 400]).toContain(response.status());

    const body = await response.json();
    expect(body.status).toBe('error');
    expect(body.message).toMatch(/brand|not found|invalid/i);
  });
});
