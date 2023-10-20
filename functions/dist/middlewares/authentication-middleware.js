"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const authenticationMiddleware = (req, res, next) => {
    var _a, _b;
    const authHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const tokenFromHeader = authHeader ? authHeader.split(' ')[1] : undefined;
    const tokenFromCookie = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.accessToken;
    // Use token from header or cookie, whichever is available
    const token = tokenFromHeader || tokenFromCookie;
    console.log('Headers:', req.headers);
    console.log('Cookies:', req.cookies);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!jwt_1.JWT_SIGN) {
        return res.status(404).json({ error: 'No token available' });
    }
    jsonwebtoken_1.default.verify(token, jwt_1.JWT_SIGN, (error, user) => {
        if (error) {
            console.log('JWT verification Error', error);
            return res.status(401).json({ error: 'Token Invalid' });
        }
        console.log("Decoded JWT:", user);
        req.user = user;
        next();
    });
};
exports.default = authenticationMiddleware;
