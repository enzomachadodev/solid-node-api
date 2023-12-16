import express, { NextFunction, Request, Response } from "express";
import { setupRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = express();

app.use(express.json());
setupRoutes(app);
app.use(
  (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response => {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.flatten().fieldErrors });
    }

    if (env.NODE_ENV !== "production") {
      console.log(error);
    }
    return res.status(500).json({ message: "Internal server error" });
  },
);
