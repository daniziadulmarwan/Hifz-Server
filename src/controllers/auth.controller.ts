import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

class AuthController {
  public async signup(req: Request, res: Response): Promise<Response> {
    try {
      const { name, username, password } = req.body;
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);
      const dataUser = {
        name,
        username,
        password: hashedPassword,
      };
      await User.create(dataUser);
      return res.status(201).json({ msg: "success create data user" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async signin(req: Request, res: Response): Promise<Response> {
    try {
      const { username } = req.body;

      const user: any = await User.findOne({ username: username });
      const dataUser = {
        name: user.name,
        username: user.username,
      };

      const accessKey = process.env.ACCESS_JWT_KEY;
      const token = jwt.sign(dataUser, accessKey!, { expiresIn: "1d" });

      // const refreshKey = process.env.REFRESH_JWT_KEY;
      // const refreshToken = jwt.sign(dataUser, refreshKey!, { expiresIn: "1d" });
      // await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken });
      // res.cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      // });

      return res.status(201).json({ token });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async me(req: Request, res: Response): Promise<Response> {
    try {
      const { username } = req.app.locals.user;
      const userSelf = await User.findOne({ username: username }).select(
        "_id name username"
      );
      return res.status(200).json(userSelf);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  // public async refreshToken(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const tokenCookies = req.cookies.refreshToken;
  //     console.log(tokenCookies);
  //     if (!tokenCookies) return res.sendStatus(401);

  //     const user: any = await User.findOne({ refresh_token: tokenCookies });
  //     if (!user) return res.sendStatus(403);

  //     const refreshKey = process.env.REFRESH_JWT_KEY;
  //     const matchToken = jwt.verify(tokenCookies, refreshKey!);
  //     if (!matchToken) return res.sendStatus(403);

  //     const dataUser = {
  //       name: user.name,
  //       username: user.username,
  //     };
  //     const accessKey = process.env.ACCESS_JWT_KEY;
  //     const token = jwt.sign(dataUser, accessKey!, { expiresIn: "2m" });
  //     return res.status(200).json({ token });
  //   } catch (error: any) {
  //     return res.status(400).json(error.message);
  //   }
  // }

  // public async signout(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const tokenCookies = req.cookies.refreshToken;
  //     if (!tokenCookies) return res.sendStatus(204);
  //     const user = await User.findOne({ refresh_token: tokenCookies });
  //     if (!user) return res.sendStatus(204);
  //     await User.findByIdAndUpdate(user._id, { refresh_token: null });
  //     res.clearCookie("refreshToken");
  //     return res.sendStatus(200);
  //   } catch (error: any) {
  //     return res.status(400).json(error.message);
  //   }
  // }
}

export default new AuthController();
