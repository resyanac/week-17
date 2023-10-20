import { Request as ExpressRequest, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends ExpressRequest {
    user: { role: string; [key: string]: any };
}

const checkRole = (roles: string[]) => {
    return (req: ExpressRequest, res: Response, next: NextFunction) => {
        const request = req as AuthenticatedRequest;

        if (!request.user) {
            console.error('User object is missing from the request.');
            return res.status(401).json({ message: 'Not Authenticated.' });
        }

        console.log('User Role:', request.user.role);

        if (!roles.includes(request.user.role)) {
            return res.status(403).json({ message: "Access Denied: You don't have the required permission" });
        }
        next();
    };
};


export default checkRole;
