"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = express_1.default.Router();
router.post("/auth/signUp", validation_middleware_1.validateSignUp, auth_controller_1.signUp);
router.post("/auth/signIn", validation_middleware_1.validateSignIn, auth_controller_1.signIn);
router.post("/auth/logout", auth_controller_1.logoutUser);
exports.default = router;
