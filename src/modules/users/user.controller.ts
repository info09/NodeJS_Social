import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";
import RegisterDto from "./dtos/register.dto";
import { TokenData } from "../auth";

export default class UserController {
    private userService = new UserService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegisterDto = req.body;
            const tokenData: TokenData = await this.userService.createUser(model);
            res.status(201).json(tokenData);
        } catch (error) {
            next(error);
        }
    }
}