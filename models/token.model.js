import { model, Schema } from "mongoose";

const tokenSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "Users" },
  refreshToken: { type: String, required: true },
});

const TOKEN = model("tokens", tokenSchema);

export default TOKEN;
