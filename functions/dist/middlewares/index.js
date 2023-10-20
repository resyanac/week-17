"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_middleware_1 = __importDefault(require("./authentication-middleware"));
const middleWares = (app) => {
    // helmetApp(app);
    // morganApp(app);
    // corsMiddleware(app);
    // app.use(xRequestId)
    (0, authentication_middleware_1.default)(app);
};
exports.default = middleWares;
