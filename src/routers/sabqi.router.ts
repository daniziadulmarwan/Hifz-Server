import { Router } from "express";
import sabqiController from "../controllers/sabqi.controller";
import { auth } from "../middlewares/auth";

class SabqiRouter {
  private route: Router;

  get _route() {
    return this.route;
  }

  constructor() {
    this.route = Router();
    this.router();
  }

  public router() {
    this.route.use(auth);
    this.route.get("/getAllSabqi", sabqiController.fetchAll);
    this.route.post("/createSabqi", sabqiController.createSabqi);
    this.route.get("/getSabqiById/:id", sabqiController.fetchOne);
    this.route.put("/updateSabqi/:id", sabqiController.updateSabqi);
    this.route.delete("/deleteSabqi/:id", sabqiController.destroySabqi);

    this.route.get(
      "/getAllSabqiBySantriId/:id",
      sabqiController.getAllSabqiBySantriId
    );
  }
}

export default new SabqiRouter()._route;
