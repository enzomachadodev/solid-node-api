import { Express, Router } from "express";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";

export const setupRoutes = (app: Express) => {
  const router = Router();
  router.post("/users", register);
  router.post("/sessions", authenticate);
  app.use("/api", router);
};
