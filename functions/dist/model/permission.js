"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["Approver"] = "approver";
    UserRole["Staff"] = "staff";
})(UserRole || (UserRole = {}));
const permissionSchema = new mongoose_1.default.Schema({
    role: {
        type: String,
        enum: [UserRole.Admin, UserRole.Approver, UserRole.Staff],
    },
});
const Permission = mongoose_1.default.model("Permission", permissionSchema);
exports.default = Permission;
