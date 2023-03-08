import { Schema, model, Document } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  password: string;
  refresh_token: string;
}

interface IUSerDocument extends IUser, Document {}

const userSchema = new Schema<IUSerDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
