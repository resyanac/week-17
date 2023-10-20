import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { JWT_SIGN } from '../config/jwt';

export interface AuthenticatedRequest extends Request {
    user: { role: string; [key: string]: any };
}

const authenticationMiddleware: any = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization;
    const tokenFromHeader = authHeader ? authHeader.split(' ')[1] : undefined;
    const tokenFromCookie = req.cookies?.accessToken;

    // Use token from header or cookie, whichever is available
    const token = tokenFromHeader || tokenFromCookie;
    console.log('Headers:', req.headers);
    console.log('Cookies:', req.cookies);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!JWT_SIGN) {
        return res.status(404).json({ error: 'No token available' });
    }

    jwt.verify(token, JWT_SIGN, (error: VerifyErrors | null, user: any | undefined) => {
        if (error) {
            console.log('JWT verification Error', error);
            return res.status(401).json({ error: 'Token Invalid' });
        }
        console.log("Decoded JWT:", user);
        req.user = user;
        next();
    });
};

export default authenticationMiddleware;
