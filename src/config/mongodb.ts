import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.set("strictPopulate", false);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hfiz_book");
}

export default main;
