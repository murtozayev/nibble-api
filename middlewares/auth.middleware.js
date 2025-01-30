import BaseError from "../error/base.error.js";
import tokenService from "../service/token.service.js";

export default async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(BaseError.UnauthorizedError());
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2) {
      return next(BaseError.UnauthorizedError());
    }
    const accessToken = parts[1];

    let userData;
    try {
      userData = tokenService.verifyAccessToken(accessToken);
    } catch (err) {
      return next(BaseError.UnauthorizedError());
    }

    if (!userData) {
      return next(BaseError.UnauthorizedError());
    }
    req.user = userData;

    next();
  } catch (error) {
    return next(BaseError.UnauthorizedError());
  }
}
