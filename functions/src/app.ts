import express from 'express';
import 'dotenv/config';
import routes from './routes/main.route';
import { db } from './config/db.connection';
import middleWares from './middlewares';
import cookieParser from 'cookie-parser'; 
import cors from 'cors';
import authenticationMiddleware from './middlewares/authentication-middleware';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS", "HEAD"]
// }));
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // This allows the cookies to be sent
};

app.use(cors(corsOptions));
app.use(cookieParser());
// app.use(authenticationMiddleware);
app.use(routes);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});




db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected to database');
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});