// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User, {IUser}  from '../config/user.schema';
import {JWT_SIGN} from '../config/jwt';
import userSchema from '../config/user.schema';
import Permission from '../model/permission';
import { Schema } from 'mongoose';



const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password, role } = req.body;

        // Check if the user with the given username or email already exists
        const existingUser = await userSchema.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            res.status(400).json({ message: 'Username or email already exists.' });
            return;
        }

        const newUser = new userSchema({ username, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error: any) {
        console.error("Error details:", error);
        if (error.code === 11000) {
            res.status(400).json({ message: 'Username or email already taken.' });
            return;
        }
        res.status(500).json({ message: 'Something went wrong.' });
    }
};



const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userSchema.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);    

    if (isPasswordCorrect) {
      const tokenPayload = { username: user.username, id: user._id, role: user.role };

      const accessToken = jwt.sign(tokenPayload, JWT_SIGN);
      const refreshToken = jwt.sign(tokenPayload, JWT_SIGN);
      const accessTokenExpiration = Date.now() + 1 * 60 * 60 * 1000;  // 1 hour from now
      
      res.cookie('accessToken', accessToken, {  expires: new Date(accessTokenExpiration), httpOnly: false, secure: true, sameSite : "none", path : "/" });
      res.cookie('refreshToken', refreshToken, {  maxAge: 7 * 24 * 60 * 60 * 1000 , httpOnly: false, secure: true, sameSite : "none", path : "/" });
      


      return res.status(200).json({
        success: true,
        message: "User successfully logged in",
        user: username, 
        role: user.role,
        accessToken: accessToken, // New field
        refreshToken: refreshToken, // New field
        accessTokenExpiration: accessTokenExpiration // New field
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password incorrect"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


const logout = (req: Request, res: Response): void => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};



export { register, login, logout}