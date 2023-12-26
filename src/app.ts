import express from "express";
import cookieParser from "cookie-parser";

import { handleError } from "./http/middlewares/handle-error";
import { routes } from "./http/routes";

export const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.use(handleError);
