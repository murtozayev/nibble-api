import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "Users" },
    productImage: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productCategory: { type: String, required: true },
    productQuantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CART = model("cart", cartSchema);
