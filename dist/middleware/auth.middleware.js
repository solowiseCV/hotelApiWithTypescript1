"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, please login");
        }
        //verify token
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT NOT DEFINED  ");
        }
        const verify = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //get user id from token
        const user = yield user_model_1.default.findById(verify.id).select("-password");
        if (!user) {
            res.status(401);
            throw new Error("User not Found");
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401);
        throw new Error("Not authorized,please login");
    }
}));
//Admin only
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    }
    else {
        res.status(401);
        throw new Error("Not authorized to perfume this action");
    }
};
exports.adminOnly = adminOnly;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (typeof authHeader === "string" && authHeader === "Bearer") {
        const token = authHeader.split(" ")[1];
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT NOT DEFINED  ");
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err)
                res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("You are not authenticated!");
    }
};
exports.verifyToken = verifyToken;
