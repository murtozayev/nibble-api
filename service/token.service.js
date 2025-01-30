import jwt from "jsonwebtoken";
import TOKEN from "../models/token.model.js";
import BaseError from "../error/base.error.js";

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    try {
      const user = await TOKEN.findById(userId);

      if (user) {
        user.refreshToken = refreshToken;
        user.save();
      }

      const token = await TOKEN.create({ user: userId, refreshToken });

      return token;
    } catch (error) {
      throw BaseError.UnauthorizedError();
    }
  }

  async removeToken(refreshToken) {
    return await TOKEN.findOneAndDelete({ refreshToken });
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH);
  }
  verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_ACCESS);
  }
}

export default new TokenService();
