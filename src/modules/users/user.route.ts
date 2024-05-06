import { Router } from "express";
import { Route } from "../../core/interfaces";
import UserController from "./user.controller";
import { validationMiddleware } from "../../core/middleware";
import RegisterDto from "./dtos/register.dto";

export default class UserRoute implements Route {
    public path = '/api/users';
    public router = Router();

    public userController = new UserController();

    /**
     *
     */
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, validationMiddleware(RegisterDto, true), this.userController.register);
    }
}