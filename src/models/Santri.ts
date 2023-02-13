import { Schema, model } from "mongoose";

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

export default model("Santri", SantriSchema);
