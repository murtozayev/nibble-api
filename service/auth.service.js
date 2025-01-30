import pkg from "bcryptjs";
const { hash, compare } = pkg;
import { UserDto } from "../dtos/user.dto.js";
import AUTH from "../models/auth.model.js";
import tokenService from "./token.service.js";
import TOKEN from "../models/token.model.js";
import BaseError from "../error/base.error.js";

class AuthService {
  async register(name, email, password) {
    const existUser = await AUTH.findOne({ email });

    if (existUser) {
      throw BaseError.BadRequest("This user already registered");
    }

    const hashPassword = await hash(password, 10);

    const newUser = await AUTH.create({
      name,
      email,
      password: hashPassword,
    });

    const userDto = new UserDto(newUser);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async login(email, password) {
    const user = await AUTH.findOne({ email });

    if (!user) {
      throw BaseError.BadRequest("User is not defined");
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw BaseError.BadRequest("Password is incorrect");
    }

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw BaseError.UnauthorizedError()
    }

    let userPayload;
    try {
      userPayload = tokenService.verifyRefreshToken(refreshToken);
    } catch (err) {
      throw BaseError.BadRequest("Error with refreshToken");
    }

    const tokenDB = await TOKEN.findOne({ refreshToken });
    if (!tokenDB) {
      throw BaseError.UnauthorizedError("Token db not refresh token");
    }

    const user = await AUTH.findById(userPayload.id);
    if (!user) {
      throw BaseError.BadRequest("User is not defined");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    try {
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
    } catch (err) {
      throw BaseError.UnauthorizedError();
    }

    return { user: userDto, ...tokens };
  }
}

export default new AuthService();
