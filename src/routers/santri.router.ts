import { Router } from "express";
import santriController from "../controllers/santri.controller";
import { auth } from "../middlewares/auth";

class SantriRouter {
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
    this.route.get("/getAllSantri", santriController.fetchAll);
    this.route.post("/createSantri", santriController.createSantri);
    this.route.get("/getSantriById/:id", santriController.fetchOne);
    this.route.put("/updateSantri/:id", santriController.updateSantri);
    this.route.delete("/deleteSantri/:id", santriController.destroySantri);
  }
}

export default new SantriRouter()._route;
