import { Router } from "express";
import authController from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";

class AuthRouter {
  private route: Router;

  get _route() {
    return this.route;
  }

  constructor() {
    this.route = Router();
    this.router();
  }

  public router() {
    this.route.post("/signup", authController.signup);
    this.route.post("/signin", authController.signin);
    this.route.get("/me", auth, authController.me);
    this.route.get("/refresh-token", authController.refreshToken);
    this.route.delete("/signout", authController.signout);
  }
}

export default new AuthRouter()._route;
