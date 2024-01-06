import express, { Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const router = express.Router();

router.post("/", (request: Request, response: Response) => {
  try {
    const { token } = request.body;

    if (token) {
      jwt.verify(
        token["value"],
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
