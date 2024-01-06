import express, { Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  try {
    const authHeader = request.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (token) {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: JsonWebTokenError | null, decoded: any) => {
          if (err) {
            response.clearCookie("token");
            return response.sendStatus(401);
          } else {
            return response.json({ decoded });
          }
        },
      );
    } else {
      return response.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
