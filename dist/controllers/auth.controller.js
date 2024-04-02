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
exports.logoutUser = exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_services_1 = require("../services/auth.services");
const generateToken = (id) => {
    // REMOVE THE CONDITIONAL STATEMENT WHEN YOU ADD A .ENV FILE WITH THE MONGOOSE STRING
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};
//Register
exports.signUp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password, role } = req.body;
    //validation
    if (!email || !name || !password) {
        res.status(400);
        throw new Error("please fill all required fields");
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    //checking if user exists
    const existingUser = yield (0, auth_services_1.checkExistingUser)({ email });
    if (existingUser) {
        res.status(409);
        throw new Error("User already exists,Please sign in");
    }
    //creating a new user
    const user = yield (0, auth_services_1.createUser)({ name,
        email,
        password: hashedPassword,
        role: "default"
    });
    //generate token
    const token = generateToken(user._id);
    if (user) {
        const { _id, name, email } = user;
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            //secure:true,
            //sameSite: none,
        });
        try {
            yield user.save();
            res.status(201).json({
                _id, name, email,
            });
        }
        catch (error) {
            res.status(500);
            throw new Error("Something went wrong");
        }
    }
    res.status(201).json(user);
}));
//login user
exports.signIn = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Fill all fields...");
    }
    const user = yield (0, auth_services_1.checkUserEmailExist)({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const validPassword = yield bcryptjs_1.default.compare(password, user.password);
    const token = generateToken(user._id);
    if (validPassword) {
        try {
            const newUser = yield (0, auth_services_1.loginUser)({ email });
            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400),
                //secure:true,
                //sameSite: none,
            });
            res.status(200).json(newUser);
        }
        catch (error) {
            res.status(500);
            throw new Error("Something went wrong");
        }
    }
}));
//logout
exports.logoutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token", {});
    res.status(200).json({ message: "Succesfully logged out now..." });
}));
