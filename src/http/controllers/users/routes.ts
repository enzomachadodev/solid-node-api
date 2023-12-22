import { register } from "@/http/controllers/users/register";
import { Router } from "express";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export const usersRoutes = Router();

usersRoutes.post("/", register);
usersRoutes.get("/me", verifyJWT, profile);
usersRoutes.post("/sessions");
