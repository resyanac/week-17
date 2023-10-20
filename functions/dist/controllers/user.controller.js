"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const user_schema_1 = __importDefault(require("../config/user.schema"));
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        // Check if the user with the given username or email already exists
        const existingUser = await user_schema_1.default.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            res.status(400).json({ message: 'Username or email already exists.' });
            return;
        }
        const newUser = new user_schema_1.default({ username, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful' });
    }
    catch (error) {
        console.error("Error details:", error);
        if (error.code === 11000) {
            res.status(400).json({ message: 'Username or email already taken.' });
            return;
        }
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await user_schema_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (isPasswordCorrect) {
            const tokenPayload = { username: user.username, id: user._id, role: user.role };
            const accessToken = jsonwebtoken_1.default.sign(tokenPayload, jwt_1.JWT_SIGN);
            const refreshToken = jsonwebtoken_1.default.sign(tokenPayload, jwt_1.JWT_SIGN);
            const accessTokenExpiration = Date.now() + 1 * 60 * 60 * 1000; // 1 hour from now
            res.cookie('accessToken', accessToken, { expires: new Date(accessTokenExpiration), httpOnly: false, secure: true, sameSite: "none", path: "/" });
            res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: false, secure: true, sameSite: "none", path: "/" });
            return res.status(200).json({
                success: true,
                message: "User successfully logged in",
                user: username,
                role: user.role,
                accessToken: accessToken,
                refreshToken: refreshToken,
                accessTokenExpiration: accessTokenExpiration // New field
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password incorrect"
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};
exports.logout = logout;
