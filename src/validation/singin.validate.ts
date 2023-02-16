import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/User";

export const signin = [
  body("username")
    .notEmpty()
    .isString()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { username: value } });
      if (!user) return Promise.reject("user not found");
      const matchPass = bcrypt.compareSync(req.body.password, user.password);
      if (!matchPass) return Promise.reject("something wrong");
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  },
];
