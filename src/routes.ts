import express from "express";
import { User } from "./entities/User";
import usersUseCases from "./use-case/users";

const routes = express.Router();

routes.get("/health", (__, res) => res.status(200).json("It's working"));

routes.get("/users", (__, res) => {
  return res.status(200).json(usersUseCases.listUsers());
});

routes.post("/users", (req, res) => {
  const user: User = req.body;
  usersUseCases.createUser(user);
  return res.status(201).json(usersUseCases.listUsers());
});

routes.put("/users/:email", (req, res) => {
  if (!req.params?.email || !req.body?.name) {
    return res.status(400).json({ error: "Email and name are required" });
  }
  usersUseCases.updateUser({ name: req.body?.name, email: req.params.email });
  return res.status(200).json(usersUseCases.listUsers());
});

routes.post("/users/:email/rollback", (req, res) => {
  if (!req.params?.email) {
    return res.status(400).json({ error: "Email is required" });
  }
  usersUseCases.rollbackUser(req.params.email);
  return res.status(201).json(usersUseCases.listUsers());
});

export { routes };
