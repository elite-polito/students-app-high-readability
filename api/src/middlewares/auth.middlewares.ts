import {RequestHandler} from "express";
export const isMyApp: RequestHandler = (req, res, next) => {
     if (req.query.secret === process.env.SECRET)
        return next();

    return res.status(401).json({ error: 'Unauthorized' });
}