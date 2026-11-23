const request = require("supertest");
const app = require("../server");

test("GET /api/cars returns a list", async () => {
  const res = await request(app).get("/api/cars");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("GET /api/cars/1 returns one car", async () => {
  const res = await request(app).get("/api/cars/1");
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(1);
});

test("GET /api/cars/999 returns 404", async () => {
  const res = await request(app).get("/api/cars/999");
  expect(res.status).toBe(404);
});

test("POST /api/orders creates an order", async () => {
  const res = await request(app).post("/api/orders").send({ carId: 1 });
  expect(res.status).toBe(201);
});