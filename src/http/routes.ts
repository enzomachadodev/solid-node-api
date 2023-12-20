import { Express, Router } from "express";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middlewares/verify-jwt";

export const setupRoutes = (app: Express) => {
  const router = Router();

  router.post("/users", register);
  router.post("/sessions", authenticate);
  router.post("/me", verifyJWT, profile);

  app.use("/api", router);
};
