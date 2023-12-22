import { Router } from "express";
import { authenticate } from "./authenticate";

export const sessionRoutes = Router();

sessionRoutes.post("/", authenticate);
