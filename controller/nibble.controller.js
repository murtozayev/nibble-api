import nibbleService from "../service/nibble.service.js";

class NibbleController {
  async createFood(req, res, next) {
    try {
      const { image, name, price, category, delivery, time, restaurant, rate } =
        req.body;

      const data = await nibbleService.createFood(
        image,
        name,
        price,
        category,
        delivery,
        time,
        restaurant,
        rate
      );

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { image, name, price, category, delivery, time, restaurant, rate } =
        req.body;
      const id = req.params.id;
      const data = await nibbleService.update(
        id,
        image,
        name,
        price,
        category,
        delivery,
        time,
        restaurant,
        rate
      );

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;

      await nibbleService.delete(id);

      return res.json("Item removed successfully");
    } catch (error) {
      next(error);
    }
  }

  async getFoods(req, res, next) {
    try {
      const data = await nibbleService.getFoods();

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req, res, next) {
    try {
      const id = req.params.id;
      const author = req.user.id;

      await nibbleService.addToCart(id, author);

      return res.json("Thank you");
    } catch (error) {
      next(error);
    }
  }

  async cart(req, res, next) {
    try {
      const id = req.user.id;

      const data = await nibbleService.cart(id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async searchItem(req, res, next) {
    try {
      const { search } = req.query;

      const data = await nibbleService.searchTerm(search);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const { id } = req.params;

      await nibbleService.deleteItem(id);

      return res.json("Item removed from your cart");
    } catch (error) {
      next(error);
    }
  }

  async categories(req, res, next) {
    try {
      const data = await nibbleService.categories();

      return res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async category(req, res, next) {
    try {
      const { category } = req.query;

      const data = await nibbleService.category(category);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async restaurants(req, res, next) {
    try {
      const data = await nibbleService.restaurants();

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async restaurant(req, res, next) {
    try {
      const { rest } = req.query;

      const data = await nibbleService.restaurant(rest);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getFood(req, res, next) {
    try {
      const { id } = req.params;

      const data = await nibbleService.getFood(id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async favourite(req, res, next) {
    try {
      const { id } = req.params;
      const data = await nibbleService.favourite(id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async favourites(req, res, next) {
    try {
      const data = await nibbleService.favourites()

      return res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

export default new NibbleController();
