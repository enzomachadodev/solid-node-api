import { env } from "@/env";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

export function handleError(
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (error instanceof ZodError) {
    return response.status(400).json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({ message: error.message });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  }

  return response.status(500).json({ message: "Internal server error" });
}
