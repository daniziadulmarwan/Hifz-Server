import { Request, Response } from "express";
import Manzil from "../models/Manzil";
import { getDayFromDate } from "../utils/formater";

class ManzilController {
  public async fetchAll(req: Request, res: Response): Promise<Response> {
    try {
      const manzil = await Manzil.find().select("_id hari tanggal juz");
      return res.status(200).json({ msg: "success", data: manzil });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async fetchOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const manzil = await Manzil.findOne({ _id: id }).select(
        "_id hari tanggal juz"
      );
      return res.status(200).json({ msg: "success", data: manzil });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async createManzil(req: Request, res: Response): Promise<Response> {
    try {
      const { date, juz, santri_id } = req.body;
      let hari = getDayFromDate(date);
      await Manzil.create({
        hari,
        tanggal: date,
        juz,
        santri_id,
      });
      return res.status(201).json({ msg: "success create data manzil" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async updateManzil(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { date, juz } = req.body;
      let hari = getDayFromDate(date);
      await Manzil.findByIdAndUpdate(id, {
        hari,
        tanggal: date,
        juz,
      });
      return res.status(200).json({ msg: "success update data manzil" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async destroyManzil(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await Manzil.findByIdAndRemove(id);
      return res.status(200).json({ msg: "success delete data manzil" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async getAllManzilBySantriId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const manzil = await Manzil.find()
        .where("santri_id")
        .equals(id)
        .where("status")
        .equals("complete")
        .select("_id hari tanggal juz");
      return res.status(200).json({ msg: "success", data: manzil });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
}

export default new ManzilController();
