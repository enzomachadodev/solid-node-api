import { Router } from "express";
import { createGym } from "./create";
import { searchGyms } from "./search";
import { nearby } from "./nearby";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export const gymsRoutes = Router();

gymsRoutes.use(verifyJWT);

gymsRoutes.post("/", createGym);
gymsRoutes.get("/search", searchGyms);
gymsRoutes.get("/nearby", nearby);
