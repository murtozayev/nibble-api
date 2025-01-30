import BaseError from "../error/base.error.js";
import { CART } from "../models/cart.model.js";
import { PRODUCT } from "../models/products.model.js";

class NibbleService {
  async createFood(
    image,
    name,
    price,
    category,
    delivery,
    time,
    restaurant,
    rate
  ) {
    if (
      !image ||
      !name ||
      !price ||
      !category ||
      !delivery ||
      !time ||
      !restaurant ||
      !rate
    ) {
      throw BaseError.BadRequest("Data is not full, try again");
    }
    return await PRODUCT.create({
      image,
      name,
      price,
      category,
      delivery,
      time,
      restaurant,
      rate,
    });
  }

  async update(
    id,
    image,
    name,
    price,
    category,
    delivery,
    time,
    restaurant,
    rate
  ) {
    return await PRODUCT.findByIdAndUpdate(
      id,
      { image, name, price, category, delivery, time, restaurant, rate },
      { new: true }
    );
  }

  async delete(id) {
    await PRODUCT.findByIdAndDelete(id);
  }

  async getFoods() {
    return await PRODUCT.find();
  }

  async addToCart(id, author) {
    const foundItem = await PRODUCT.findById(id);

    if (!foundItem) {
      throw BaseError.UnauthorizedError();
    }

    const cart = await CART.create({
      author,
      productImage: foundItem.image,
      productName: foundItem.name,
      productPrice: foundItem.price,
      productCategory: foundItem.category,
      productQuantity: 1,
    });

    return cart;
  }

  async cart(id) {
    return await CART.find({ author: id });
  }

  async searchTerm(search) {
    return await PRODUCT.find({ name: { $regex: search, $options: "i" } });
  }

  async deleteItem(id) {
    return await CART.findByIdAndDelete(id);
  }

  async categories() {
    return await PRODUCT.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
  }

  async category(search) {
    return await PRODUCT.find({ category: { $regex: search, $options: "i" } });
  }

  async restaurants() {
    return await PRODUCT.aggregate([
      {
        $group: {
          _id: "$restaurant",
          count: { $sum: 1 },
        },
      },
    ]);
  }

  async restaurant(search) {
    return await PRODUCT.find({
      restaurant: { $regex: search, $options: "i" },
    });
  }

  async getFood(_id) {
    return await PRODUCT.findOne({ _id });
  }

  async favourite(id) {
    const product = await PRODUCT.findById(id);

    if (!product) {
      throw BaseError.BadRequest("Product is not defined");
    }

    return await PRODUCT.findByIdAndUpdate(
      id,
      { favourite: !product.favourite },
      { new: true }
    );
  }

  async favourites() {
    return await PRODUCT.find({ favourite: true });
  }
}

export default new NibbleService();
