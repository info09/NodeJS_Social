import { IndexRoute } from './modules/index';
import App from "./app";
import 'dotenv/config';
import validateEnv from './core/utils/validate_env';

validateEnv();
const routes = [new IndexRoute()];
const app = new App(routes);

app.listen();