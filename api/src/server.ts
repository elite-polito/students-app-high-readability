import './preconditions'

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';

import testerRoutes from "./routes/tester.routes.js";
import * as Sentry from "@sentry/node";
import { isMyApp } from './middlewares/auth.middlewares.js';
import responseRoutes from './routes/response.routes.js';

const app = express();
const port = process.env.PORT;



const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(session({
    secret: "Another randomly generated phrase to prevent session hijacking",
    resave: false,
    saveUninitialized: false,
}));


app.use(express.json());
app.use(isMyApp);

app.use('/testers', testerRoutes);
app.use('/responses', responseRoutes);

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});