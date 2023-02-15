import { Router } from "express";
import manzilController from "../controllers/manzil.controller";
import sabaqController from "../controllers/sabaq.controller";
import { auth } from "../middlewares/auth";

class ManzilRouter {
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
    this.route.get("/getAllManzil", manzilController.fetchAll);
    this.route.post("/createManzil", manzilController.createManzil);
    this.route.get("/getManzilById/:id", manzilController.fetchOne);
    this.route.put("/updateManzil/:id", manzilController.updateManzil);
    this.route.delete("/deleteManzil/:id", manzilController.destroyManzil);
    this.route.get(
      "/getAllManzilBySantriId/:id",
      manzilController.getAllManzilBySantriId
    );
  }
}

export default new ManzilRouter()._route;
