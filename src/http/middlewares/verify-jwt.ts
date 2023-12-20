import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function verifyJWT(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).send({ message: "Invalid Bearer Token" });
  }

  verify(token, String(process.env.JWT_SECRET), (error: any, decoded: any) => {
    if (error) return response.status(401).send({ message: error.message });
    response.locals.user = {
      id: decoded.sub,
      admin: decoded.admin,
    };
    response.locals.decoded = decoded;
  });

  next();
}
