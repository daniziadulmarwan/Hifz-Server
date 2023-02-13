import { Router } from "express";
import santriController from "../controllers/santri.controller";

class SabaqRouter {
  private route: Router;

  get _route() {
    return this.route;
  }

  constructor() {
    this.route = Router();
    this.router();
  }

  public router() {
    this.route.get("/getAllSantri", santriController.fetchAll);
  }
}

export default new SabaqRouter()._route;
