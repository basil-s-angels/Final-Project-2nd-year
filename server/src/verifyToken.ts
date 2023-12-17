/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.cookies.token;
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    console.log(user);
    next();
  } catch (error) {
    response.clearCookie("token");
    return response.status(401).send("Unauthorized");
  }
}
