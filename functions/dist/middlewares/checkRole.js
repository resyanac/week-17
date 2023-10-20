"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkRole = (roles) => {
    return (req, res, next) => {
        const request = req;
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
exports.default = checkRole;
