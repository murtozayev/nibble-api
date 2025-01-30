import express from "express";
import nibbleController from "../controller/nibble.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const nibbleRoute = express.Router();

nibbleRoute.post("/create-food", nibbleController.createFood);
nibbleRoute.put("/update-food/:id", nibbleController.update);
nibbleRoute.delete("/delete-food/:id", nibbleController.delete);
nibbleRoute.get("/foods", nibbleController.getFoods);
nibbleRoute.get("/food/:id", nibbleController.getFood);
nibbleRoute.post(
  "/add-to-cart/:id",
  authMiddleware,
  nibbleController.addToCart
);
nibbleRoute.get("/cart", authMiddleware, nibbleController.cart);
nibbleRoute.get("/findfood", authMiddleware, nibbleController.searchItem);
nibbleRoute.get("/categories", authMiddleware, nibbleController.categories);
nibbleRoute.get("/category", authMiddleware, nibbleController.category);
nibbleRoute.get("/restoraunts", authMiddleware, nibbleController.restaurants);
nibbleRoute.get("/restaurant", authMiddleware, nibbleController.restaurant);
nibbleRoute.put("/favourite/:id", authMiddleware, nibbleController.favourite);
nibbleRoute.get("/favourites", authMiddleware, nibbleController.favourites);

export default nibbleRoute;
