import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.set("strictPopulate", false);

const mongoOnline =
  "mongodb+srv://dani913:JtJWHpM0298TLWhz@cluster0.ubiwmc7.mongodb.net/hfiz_book?retryWrites=true&w=majority";

const mongoOffline = "mongodb://127.0.0.1:27017/hfiz_book";

async function main() {
  await mongoose.connect(mongoOnline);
}

export default main;
