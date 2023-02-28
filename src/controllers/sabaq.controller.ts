import { Request, Response } from "express";
import Sabaq from "../models/Sabaq";
import { getDayFromDate } from "../utils/formater";

class SabaqController {
  public async fetchAll(req: Request, res: Response): Promise<Response> {
    try {
      const sabaq = await Sabaq.find().select(
        "_id hari tanggal surah juz page_juz page_quran"
      );
      return res.status(200).json({ msg: "success", data: sabaq });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async fetchOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const sabaq = await Sabaq.findOne({ _id: id }).select(
        "_id hari tanggal surah juz page_juz page_quran"
      );
      return res.status(200).json({ msg: "success", data: sabaq });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async createSabaq(req: Request, res: Response): Promise<Response> {
    try {
      const { date, surah, juz, page_juz, page_quran, santri_id } = req.body;
      let hari = getDayFromDate(date);
      let status = page_juz == 20 ? "complete" : "uncomplete";
      await Sabaq.create({
        hari,
        tanggal: date,
        surah,
        juz,
        page_juz,
        page_quran,
        santri_id,
        status,
      });
      return res.status(201).json({ msg: "success create data sabaq" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async updateSabaq(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { date, surah, juz, page_juz, page_quran } = req.body;
      let hari = getDayFromDate(date);
      await Sabaq.findByIdAndUpdate(id, {
        hari,
        tanggal: date,
        surah,
        juz,
        page_juz,
        page_quran,
      });
      return res.status(200).json({ msg: "success update data sabaq" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async destroySabaq(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await Sabaq.findByIdAndRemove(id);
      return res.status(200).json({ msg: "success delete data sabaq" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  public async getAllSabaqBySantriId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const sabaq = await Sabaq.find()
        .where("santri_id")
        .equals(id)
        .select("_id hari tanggal surah juz page_juz page_quran");
      return res.status(200).json({ msg: "success", data: sabaq });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
}

export default new SabaqController();
