import express, { Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const router = express.Router();

router.post("/", (request: Request, response: Response) => {
  try {
    const { token } = request.body;
    // console.log(token["value"], "from frontend");

    jwt.verify(
      token["value"],
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: JsonWebTokenError | null, decoded: any) => {
        if (err) {
          response.clearCookie("token");
          return response.sendStatus(401);
        } else {
          // console.log(decoded, "from backend!");
          return response.json({ decoded });
        }
      },
    );
  } catch (error) {
    console.error(error);
  }
});

export default router;
