import { Router } from "express";
import { createGym } from "./create";

export const gymsRoutes = Router();

gymsRoutes.post("/", createGym);
