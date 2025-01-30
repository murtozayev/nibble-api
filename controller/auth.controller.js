import authService from "../service/auth.service.js";

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const data = await authService.register(name, email, password);

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      });

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = await authService.login(email, password);

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      });

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const data = await authService.logout(refreshToken);

      res.clearCookie("refreshToken");

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {

      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(400).json({ message: "refreshToken topilmadi!" });
      }

      const data = await authService.refresh(refreshToken);

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      });

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
