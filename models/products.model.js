import { model, Schema } from "mongoose";

const productSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Food",
      "Cakes",
      "Drinks",
      "Cookies",
      "Beverages",
      "Desserts",
      "Appetizers",
      "Vegetarian",
      "Seafood",
      "Salads",
      "Soups",
      "Meat",
    ],
  },
  favourite: { type: Boolean, default: false },
  delivery: { type: Schema.Types.Mixed, default: "Free" },
  time: { type: String, default: "15:00" },
  rate: { type: Number, default: 1, min: 0, max: 5 },
  restaurant: { type: String, required: true },
});

export const PRODUCT = model("Product", productSchema);
