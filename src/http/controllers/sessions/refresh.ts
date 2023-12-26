import { Request, Response } from "express";
import { z } from "zod";
import jwt, { verify } from "jsonwebtoken";

import { env } from "@/env";

export async function refresh(request: Request, response: Response) {
  const cookies = request.cookies.refreshToken;

  if (!cookies) {
    return response.status(401).send({ message: "Invalid Refresh Token" });
  }

  verify(
    cookies,
    String(process.env.JWT_SECRET),
    (error: any, decoded: any) => {
      if (error) return response.status(401).send({ message: error.message });

      response.locals.user = {
        id: decoded.sub,
        admin: decoded.admin,
      };
      response.locals.decoded = decoded;
    },
  );

  const token = jwt.sign({ sub: response.locals.user.id }, env.JWT_SECRET, {
    expiresIn: "10m",
  });

  const refreshToken = jwt.sign(
    { sub: response.locals.user.id },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return response
    .cookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}
