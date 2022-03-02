import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express();

app.use(cors());    // Apply our middleware, CORS module.
app.use(express.json());    // Our server can accept JSON in the body of a request. Previously required body-parser, but express can do this now.

app.use("/api/v1/restaurants", restaurants);    // Accessed with http://localhost:5000/api/v1/restaurants
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));    // A route that doesn't exist in our route file.

export default app; // Export this file as a module.