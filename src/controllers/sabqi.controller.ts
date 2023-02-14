import { Request, Response } from "express";
import Sabaq from "../models/Sabaq";
import Sabqi from "../models/Sabqi";
import Santri from "../models/Santri";
import { getDayFromDate } from "../utils/formater";

class SabaqController {
  public async fetchAll(req: Request, res: Response): Promise<Response> {
    try {
      const sabqi = await Sabqi.find();
      return res.status(200).json({ msg: "success", data: sabqi });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async fetchOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const sabqi = await Sabqi.findOne({ _id: id });
      return res.status(200).json({ msg: "success", data: sabqi });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async createSabqi(req: Request, res: Response): Promise<Response> {
    try {
      const { date, surah, juz, page_juz, page_quran, santri_id } = req.body;
      let hari = getDayFromDate(date);
      await Sabqi.create({
        hari,
        tanggal: date,
        surah,
        juz,
        page_juz,
        page_quran,
        santri_id,
      });
      return res.status(201).json({ msg: "success create data sabqi" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async updateSabqi(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { date, surah, juz, page_juz, page_quran } = req.body;
      let hari = getDayFromDate(date);
      await Sabqi.findByIdAndUpdate(id, {
        hari,
        tanggal: date,
        surah,
        juz,
        page_juz,
        page_quran,
      });
      return res.status(200).json({ msg: "success update data sabqi" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async destroySabqi(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await Sabqi.findByIdAndRemove(id);
      return res.status(200).json({ msg: "success delete data sabqi" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
}

export default new SabaqController();
