import express, { Application } from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

// Routers
import main from "./config/mongodb";
import authRouter from "./routers/auth.router";
import santriRouter from "./routers/santri.router";

// Configuration
config();
main().then(() => console.log("Database connected"));

class App {
  private app: Application;

  get _app() {
    return this.app;
  }

  constructor() {
    this.app = express();
    this.plugins();
    this.routers();
  }

  public plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(cookieParser());
  }

  public routers(): void {
    this.app.use("/api/v1/auth", authRouter);
    this.app.use("/api/v1/santri", santriRouter);
  }
}

const port: string = process.env.PORT || "5000";
const app: Application = new App()._app;
app.listen(port, () => console.log("App running at port " + port));