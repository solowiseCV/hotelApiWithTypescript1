"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
//creating the schma
const RoomTypeSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name field"],
        trim: true,
        unique: true,
        minlength: [3, "Name must be atlease 3 charaters"],
    },
}, {
    timestamps: true
});
exports.default = model('RoomType', RoomTypeSchema);
