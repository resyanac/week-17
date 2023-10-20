// models/user.ts
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserRole {
    Admin = 'admin',
    Approver = 'approver',
    Staff = 'staff',
}

export interface IUser extends Document {
    username: string;
    role: UserRole;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9]{1,10}$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        match: /^[a-zA-Z0-9]{10,}$/,
    },
    role: {
    type: String,
    required: true,
    enum: ['admin', 'approver', 'staff'],
    // Ensure there's no "unique: true" here!
},

});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this as IUser;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

export default mongoose.model<IUser>('User', userSchema);
