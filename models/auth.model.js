import { model, Schema } from "mongoose";

const authSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const AUTH = model("Users", authSchema);

export default AUTH;
