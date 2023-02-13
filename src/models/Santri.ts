import { Schema, model } from "mongoose";
import Sabaq from "./Sabaq";

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
    sabaq: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sabaq",
      },
    ],
  },
  { timestamps: true }
);

SantriSchema.pre("findOneAndRemove", async function (next) {
  const sabaq: any = this;
  await Sabaq.deleteMany({ santri_id: sabaq._id });
  next();
});

export default model("Santri", SantriSchema);
