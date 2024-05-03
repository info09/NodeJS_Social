import { Route } from 'core/interfaces';
import express from 'express';
import mongoose from 'mongoose';

class App {
    public app: express.Application;
    public port: string | number;
    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 5000;

        this.initializeRoutes(routes);
        this.connectToDatabase();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })
    }

    private connectToDatabase() {
        try {
            const connectionString = 'mongodb+srv://huytq3103:RK199tLWX7lfjqEU@cluster0.3ozq9hc.mongodb.net/social_network?retryWrites=true&w=majority&appName=Cluster0';
            mongoose.connect(connectionString);
            console.log('Database connected...');
        } catch (error) {
            console.log('Connect to database error.');
        }
    }

    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        })
    }
}

export default App;