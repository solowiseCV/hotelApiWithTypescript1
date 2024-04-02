"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignIn = exports.validateSignUp = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi schema for signup validation
const signUpSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().min(5).max(20).required(),
    role: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6),
});
// Joi schema for login validation
const signInSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
// Middleware function for signup validation
const validateSignUp = (req, res, next) => {
    const { error } = signUpSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }
    next();
};
exports.validateSignUp = validateSignUp;
// Middleware function for login validation
const validateSignIn = (req, res, next) => {
    const { error } = signInSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }
    next();
};
exports.validateSignIn = validateSignIn;
