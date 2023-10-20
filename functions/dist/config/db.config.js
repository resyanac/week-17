"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const username = process.env.DB_ATLAS_USER;
const password = process.env.DB_ATLAS_PASS;
const cluster = process.env.DB_ATLAS_CLUSTER;
const dbname = process.env.DB_ATLAS_NAME;
const JWT_SIGN = process.env.JWT_SIGN;
const dbConfig = { username, password, cluster, dbname, JWT_SIGN };
exports.default = dbConfig;
