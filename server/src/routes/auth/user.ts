import express, { Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  try {
    const token = request.cookies.token;

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: JsonWebTokenError | null, decoded: any) => {
        if (err) {
          response.clearCookie("token");
          return response.sendStatus(401);
        } else {
          // console.log(decoded);
          return response.json({ decoded });
        }
      },
    );
  } catch (error) {
    console.error(error);
  }
});

router.delete("/", (request: Request, response: Response) => {
  try {
    response.clearCookie("token");
    return response.json({ message: "Token deleted" });
  } catch (error) {
    console.error(error);
  }
});

export default router;
