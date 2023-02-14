import { Schema, model } from "mongoose";
import Sabaq from "./Sabaq";
import Sabqi from "./Sabqi";

const SantriSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    halaqoh: {
      type: Number,
      required: true,
    },
    asal: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

SantriSchema.pre("remove", async function (next) {
  const santri: any = this;
  await Sabaq.deleteMany({ santri_id: santri._id });
  await Sabqi.deleteMany({ santri_id: santri._id });
  next();
});

export default model("Santri", SantriSchema);
