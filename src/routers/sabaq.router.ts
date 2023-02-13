import { Router } from "express";
import sabaqController from "../controllers/sabaq.controller";

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
    this.route.get("/getAllSabaq", sabaqController.fetchAll);
    this.route.post("/createSabaq", sabaqController.createSabaq);
    this.route.get("/getSabaqById/:id", sabaqController.fetchOne);
  }
}

export default new SabaqRouter()._route;
