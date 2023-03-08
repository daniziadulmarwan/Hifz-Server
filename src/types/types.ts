import { ObjectId } from "mongoose";

export type SabaqTypes = {
  hari: string;
  tanggal: Date;
  surah: string;
  juz: string;
  page_juz: number;
  page_quran: string;
  status: string;
  santri_id: ObjectId;
};
