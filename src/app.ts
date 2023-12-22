import express from "express";
import { handleError } from "./http/middlewares/handle-error";
import { routes } from "./http/routes";

export const app = express();

app.use(express.json());
app.use(routes);
app.use(handleError);
