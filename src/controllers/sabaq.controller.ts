import { Request, Response } from "express";
import Sabaq from "../models/Sabaq";
import Santri from "../models/Santri";
import { getDayFromDate } from "../utils/formater";

class SabaqController {
  public async fetchAll(req: Request, res: Response): Promise<Response> {
    try {
      const sabaq = await Sabaq.find();
      return res.status(200).json({ msg: "success", data: sabaq });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async fetchOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const sabaq = await Sabaq.findOne({ _id: id });
      return res.status(200).json({ msg: "success", data: sabaq });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async createSabaq(req: Request, res: Response): Promise<Response> {
    try {
      const { date, surah, juz, page_juz, page_quran, santri_id } = req.body;
      let hari = getDayFromDate(date);
      await Sabaq.create({
        hari,
        tanggal: date,
        surah,
        juz,
        page_juz,
        page_quran,
        santri_id,
      });
      return res.status(201).json({ msg: "success create data sabaq" });
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
      await Santri.findByIdAndRemove(id);
      return res.status(200).json({ msg: "success delete data santri" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
}

export default new SabaqController();
