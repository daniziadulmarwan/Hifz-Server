import { Request, Response } from "express";
import Santri from "../models/Santri";

class SantriController {
  public async fetchAll(req: Request, res: Response): Promise<Response> {
    try {
      const santri = await Santri.find().populate("sabaq");
      return res.status(200).json({ msg: "success", data: santri });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async fetchOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const santri = await Santri.findOne({ _id: id });
      return res.status(200).json({ msg: "success", data: santri });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async createSantri(req: Request, res: Response): Promise<Response> {
    try {
      const { name, halaqoh, asal } = req.body;
      await Santri.create({ name, halaqoh, asal });
      return res.status(201).json({ msg: "success create data santri" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async updateSantri(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, halaqoh, asal } = req.body;
      await Santri.findByIdAndUpdate(id, { name, halaqoh, asal });
      return res.status(200).json({ msg: "success update data santri" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async destroySantri(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await Santri.findOneAndRemove({ _id: id });
      return res.status(200).json({ msg: "success delete data santri" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
}

export default new SantriController();
