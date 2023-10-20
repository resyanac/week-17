"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const tax_route_1 = __importDefault(require("./tax.route"));
const user_route_1 = __importDefault(require("./user.route"));
// import authenticationMiddleware from '../middlewares/authentication-middleware'
routes.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to week 17'
    });
});
routes.use('/', tax_route_1.default);
routes.use('/', user_route_1.default);
exports.default = routes;
