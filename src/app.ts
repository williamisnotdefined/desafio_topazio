import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

// import routes from './routes';
import ErrorMiddleware from '@middleware/Error';

class App {
    express: express.Application;
    isDevEnv: boolean;
    isTestEnv: boolean;

    constructor() {
        this.express = express();
        this.isDevEnv = process.env.NODE_ENV === 'development';
        this.isTestEnv = process.env.NODE_ENV === 'test';

        this.middleware();
        this.database();
        this.routes();
    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(helmet());
        this.exceptionHandler();
    }

    private database(): void {
        if (!this.isTestEnv) {
            mongoose
                .connect(process.env.DB_URL, {
                    useCreateIndex: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                .catch(console.error);
        }
    }

    private routes(): void {
        // this.express.use('/api/v1', routes); // prefixed routes
    }

    private exceptionHandler(): void {
        this.express.use(ErrorMiddleware);
    }
}

export default new App().express;
