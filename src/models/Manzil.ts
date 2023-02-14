import { Schema, model } from "mongoose";

const ManzilSchema = new Schema(
  {
    hari: {
      type: String,
      required: true,
    },
    tanggal: {
      type: Date,
      required: true,
    },
    juz: {
      type: String,
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

export default model("Manzil", ManzilSchema);
