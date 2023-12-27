import { Router } from "express";
import { createGym } from "./create";
import { searchGyms } from "./search";
import { nearby } from "./nearby";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyRole } from "@/http/middlewares/verify-role";
import { Roles } from "@prisma/client";

export const gymsRoutes = Router();

gymsRoutes.use(verifyJWT);

gymsRoutes.post("/", verifyRole([Roles.ADMIN]), createGym);
gymsRoutes.get("/search", searchGyms);
gymsRoutes.get("/nearby", nearby);
