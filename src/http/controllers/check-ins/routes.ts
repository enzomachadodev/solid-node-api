import { Router } from "express";
import { create } from "./create";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";

export const checkInsRoutes = Router();

checkInsRoutes.use(verifyJWT);

checkInsRoutes.post("/gyms/:gymId", create);
checkInsRoutes.patch("/:checkInId/validate", validate);
checkInsRoutes.get("/history", history);
checkInsRoutes.get("/metrics", metrics);
