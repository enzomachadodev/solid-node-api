import { Router } from "express";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export const sessionRoutes = Router();

sessionRoutes.post("/", authenticate);
sessionRoutes.patch("/refresh", refresh);
