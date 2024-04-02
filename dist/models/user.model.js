"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model, Document } = mongoose_1.default;
const emailValidator = (value) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value); // Return true if value matches the regex
};
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter the name field"],
        trim: true,
        minlength: [5, "Name must be atleast 5 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        trim: true,
        validate: {
            validator: emailValidator,
            message: 'please enter a valid email'
        }
        // match: [(
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //   )]
    },
    password: {
        type: String,
        required: [true, "please provide your password"],
    },
    role: {
        type: String,
        required: true,
        default: "guest",
        enum: ["guest", "admin"]
    }
}, { timestamps: true });
exports.default = model('User', userSchema);
