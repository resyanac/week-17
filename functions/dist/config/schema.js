"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taxModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taxSchema = new mongoose_1.default.Schema({
    no: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Tertunggak",
        enum: ['Tertunggak', 'Tertagih']
    },
    isDeleted: {
        type: Boolean
    }
}, {
    timestamps: {
        currentTime: () => new Date().setUTCHours(0, 0, 0, 0)
    },
    versionKey: false
});
exports.taxModel = mongoose_1.default.model("taxes", taxSchema);
