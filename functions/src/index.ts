import express from 'express';
import 'dotenv/config';
import routes from './routes/main.route';
import { db } from './config/db.connection';
// import middleWares from './middlewares';
import cookieParser from 'cookie-parser'; 
import cors from 'cors';
// import authenticationMiddleware from './middlewares/authentication-middleware';

import * as functions from 'firebase-functions';

const app = express();
// const port = 4000;

// 
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS", "HEAD"]
// }));
const corsOptions = {
  origin: 'https://week17-resyanac.web.app',
  credentials: true, // This allows the cookies to be sent
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(routes);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected to database');
});

// app.listen(port, () => {
//   console.log(`server listening at http://localhost:${port}`);
// });

app.get('/my-api', (req, res) => {
  res.status(200).send('This is the /my-api endpoint.');
})

 export const week17_resyanac = functions.https.onRequest(app); 