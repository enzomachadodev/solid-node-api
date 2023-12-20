import express from "express";
import { setupRoutes } from "./http/routes";
import { handleError } from "./http/middlewares/handle-error";

export const app = express();

app.use(express.json());
setupRoutes(app);
app.use(handleError);
