import { Router } from "express";
import { usersRoutes } from "../controllers/users/routes";
import { sessionRoutes } from "../controllers/sessions/routes";

export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRoutes);
