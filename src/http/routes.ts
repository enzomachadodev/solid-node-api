import { Express } from "express";
import { register } from "./controllers/register";

export const appRoutes = async (app: Express) => {
  app.post("/users", register);
};
