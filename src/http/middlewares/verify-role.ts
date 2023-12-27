import { Roles } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export function verifyRole(permittedRoles: Roles[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { role } = response.locals.user;

    if (!role)
      return response.status(401).send({ message: "Invalid Bearer Token" });

    if (!permittedRoles.find((r) => r === role))
      return response.status(401).send({ message: "Insufficient permission" });

    next();
  };
}
