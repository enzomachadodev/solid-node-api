import { Express, Router } from "express";
import { register } from "./controllers/register";

export const setupRoutes = (app: Express) => {
  const router = Router();
  router.post("/users", register);

  app.use("/api", router);
};
