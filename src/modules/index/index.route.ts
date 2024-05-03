import { Route } from "core/interfaces";
import { Router } from "express";
import IndexController from "./index.controller";

export default class IndexRoute implements Route {
    public path = '/'
    public router = Router();

    public IndexController = new IndexController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.IndexController.index);
    }
}