import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import jwt from "jsonwebtoken";
import { Service } from "typedi";

@Service()
@Middleware({ type: "before" })
export class AuthMiddleware implements ExpressMiddlewareInterface {
    async use(request: Request, response: Response, next: NextFunction) {
        const publicRoutes = ["/api/users/signin", "/api/users/signup"];
        const token = request.headers["authorization"];
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';

        if (publicRoutes.includes(request.originalUrl)) {
            return next();
        }

        if (token) {
            try {
                jwt.verify(token, JWT_SECRET_KEY);
                next();
            } catch (error) {
                return response.status(401).json({ message: "Invalid token" });
            }
        } else {
            return response.status(401).json({ message: "Token missing" });
        }
    }
}
