import { Router } from "express";
import { usersRoutes } from "../controllers/users/routes";
import { sessionRoutes } from "../controllers/sessions/routes";
import { gymsRoutes } from "../controllers/gyms/routes";
import { checkInsRoutes } from "../controllers/check-ins/routes";

export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/gyms", gymsRoutes);
routes.use("/check-ins", checkInsRoutes);
