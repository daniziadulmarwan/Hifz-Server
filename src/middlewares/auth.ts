import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  // if token expired
  const time: any = jwt.decode(token);
  if (Date.now() >= time.exp * 1000) {
    return res.status(403).json({ msg: "token expired" });
  }

  const decoded: any = jwt.verify(token, process.env.ACCESS_JWT_KEY!);
  if (!decoded) return res.sendStatus(403);
  req.app.locals.user = decoded;
  next();
};
