import createError from "../utils/createError.js";



export const verifyAdmin = (req, res, next) => {
    if (!req.user || req.role !== 'admin') {
        return next(createError(403, "Access Denied! Admins only."));
    }
    next();
};
