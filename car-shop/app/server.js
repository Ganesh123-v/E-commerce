const express = require("express");
const client = require("prom-client");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Collect metrics (CPU, memory, etc.)
client.collectDefaultMetrics();

let cars = [
  { id: 1, name: "Toyota Camry", price: 25000 },
  { id: 2, name: "Honda Civic", price: 22000 },
  { id: 3, name: "BMW X5", price: 60000 }
];
let orders = [];

// View all cars
app.get("/api/cars", (req, res) => res.json(cars));

// View one car
app.get("/api/cars/:id", (req, res) => {
  const car = cars.find(c => c.id === Number(req.params.id));
  if (!car) return res.status(404).json({ error: "Car not found" });
  res.json(car);
});

// Place an order
app.post("/api/orders", (req, res) => {
  const order = { id: orders.length + 1, carId: req.body.carId };
  orders.push(order);
  res.status(201).json(order);
});

// Admin adds a car
app.post("/api/cars", (req, res) => {
  const car = { id: cars.length + 1, name: req.body.name, price: req.body.price };
  cars.push(car);
  res.status(201).json(car);
});

// Metrics for monitoring
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Start server only when run directly (not during tests)
if (require.main === module) {
  app.listen(3000, () => console.log("Car Shop running on http://localhost:3000"));
}

module.exports = app;