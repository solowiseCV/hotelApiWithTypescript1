"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const RoomSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please fill the name field"],
        minlength: [3, "Name must be atlease 3 charaters"],
        trim: true,
        unique: true,
    },
    roomType: {
        type: Schema.Types.ObjectId,
        ref: 'RoomType',
    },
    price: {
        type: Number,
        required: [true, "Please input the price"],
    },
}, {
    timestamps: true
});
exports.default = model('Room', RoomSchema);
