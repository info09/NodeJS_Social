import { IndexRoute } from './modules/index';
import App from "./app";
import 'dotenv/config';
import validateEnv from './core/utils/validate_env';
import UserRoute from './modules/users/user.route';

validateEnv();
const routes = [new IndexRoute(), new UserRoute()];
const app = new App(routes);

app.listen();