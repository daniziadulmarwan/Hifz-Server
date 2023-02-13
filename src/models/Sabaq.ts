import { Schema, model } from "mongoose";

const SabaqSchema = new Schema(
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
    santri_id: {
      type: Schema.Types.ObjectId,
      ref: "Santri",
    },
  },
  { timestamps: true }
);

export default model("Sabaq", SabaqSchema);