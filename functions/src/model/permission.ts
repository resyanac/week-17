import mongoose, { Document, Model } from "mongoose";

enum UserRole {
    Admin = "admin",
    Approver = "approver",
    Staff = "staff",
}

interface IPermission extends Document {
    role: UserRole;
}

const permissionSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: [UserRole.Admin, UserRole.Approver, UserRole.Staff],
    },
});

const Permission: Model<IPermission> = mongoose.model<IPermission>("Permission", permissionSchema);
export default Permission;
