import { Route } from './core/interfaces';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { Logger } from './core/utils';
import { errorMiddleware } from './core/middleware';

class App {
    public app: express.Application;
    public port: string | number;
    public production: boolean;

    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV == "production" ? true : false;

        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            Logger.info(`Server is running on port ${this.port}`);
        })
    }

    private connectToDatabase() {
        try {
            const connectionString = process.env.MONGODB_URI;
            if (!connectionString) {
                Logger.error('ConnectionString is invalid');
                return;
            }
            mongoose.connect(connectionString);
            Logger.info('Database connected...');
        } catch (error) {
            Logger.error('Connect to database error.');
        }
    }

    private initializeMiddleware() {
        if (this.production) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('combined'));
            this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
        } else {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }
        this.app.use(errorMiddleware);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        })
    }
}

export default App;