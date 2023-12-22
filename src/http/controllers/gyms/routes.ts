import { Router } from "express";
import { createGym } from "./create";
import { searchGyms } from "./search";
import { nearby } from "./nearby";

export const gymsRoutes = Router();

gymsRoutes.post("/", createGym);
gymsRoutes.post("/search", searchGyms);
gymsRoutes.post("/nearby", nearby);
