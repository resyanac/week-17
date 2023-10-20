"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const main_route_1 = __importDefault(require("./routes/main.route"));
const db_connection_1 = require("./config/db.connection");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS", "HEAD"]
// }));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // This allows the cookies to be sent
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
// app.use(authenticationMiddleware);
app.use(main_route_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
db_connection_1.db.on('error', console.error.bind(console, 'connection error: '));
db_connection_1.db.once('open', function () {
    console.log('Connected to database');
});
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});
