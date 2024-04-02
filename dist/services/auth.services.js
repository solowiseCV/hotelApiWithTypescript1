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
exports.loginUser = exports.checkUserEmailExist = exports.createUser = exports.checkExistingUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const checkExistingUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
    const userExists = yield user_model_1.default.findOne({ email });
    return userExists;
});
exports.checkExistingUser = checkExistingUser;
const createUser = (_b) => __awaiter(void 0, [_b], void 0, function* ({ name, email, password, role }) {
    const newUser = new user_model_1.default({ name, email, password, role });
    return newUser;
});
exports.createUser = createUser;
const checkUserEmailExist = (_c) => __awaiter(void 0, [_c], void 0, function* ({ email }) {
    const exists = yield user_model_1.default.findOne({ email });
    return exists;
});
exports.checkUserEmailExist = checkUserEmailExist;
const loginUser = (_d) => __awaiter(void 0, [_d], void 0, function* ({ email }) {
    const user = yield user_model_1.default.findOne({ email });
    return user;
});
exports.loginUser = loginUser;
