import { Schema, model } from "mongoose";
import { SabaqTypes } from "../types/types";

const SabaqSchema = new Schema<SabaqTypes>(
  {
    hari: {
      type: String,
      required: true,
    },
    tanggal: {
      type: Date,
      required: true,
    },
    surah: {
      type: String,
      required: true,
    },
    juz: {
      type: String,
      required: true,
    },
    page_juz: {
      type: Number,
      required: true,
    },
    page_quran: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["complete", "uncomplete"],
      default: "uncomplete",
      required: true,
    },
    santri_id: {
      type: Schema.Types.ObjectId,
      ref: "Santri",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Sabaq", SabaqSchema);
