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
exports.getRoom = exports.deleteRoom = exports.updatedRoom = exports.getAllRooms = exports.createRoom = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const room_services_1 = require("../services/room.services");
// Create room
exports.createRoom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, roomType, price } = req.body;
    //checking 
    if (!name || !price) {
        res.status(400);
        throw new Error("Fill all the fields");
    }
    //checking for number of charaters in name
    if (name.length < 3) {
        res.status(400);
        throw new Error("Name field must be atleast 3 charaters");
    }
    //Check if room already exist with same name field
    const existsRoom = yield (0, room_services_1.checkExistingRoom)({ name });
    if (existsRoom) {
        res.status(409);
        throw new Error("Room already exist with same name");
    }
    //create room
    try {
        const newRoom = yield (0, room_services_1.saveNewRoom)({
            name,
            roomType,
            price
        });
        res.status(201).json(newRoom);
    }
    catch (error) {
        res.status(500);
        throw new Error("Invalid Room data");
    }
}));
;
// GET endpoint for fetching all rooms with optional filters
exports.getAllRooms = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = req.query;
    try {
        const filters = Object.assign(Object.assign(Object.assign(Object.assign({}, (q.name && { name: q.name })), (q.roomType && { roomType: q.roomType })), ((q.minPrice || q.maxPrice) && { price: Object.assign(Object.assign({}, (q.minPrice && { $gt: q.minPrice })), (q.maxPrice && { $lt: q.maxPrice })) })), (q.search && { title: { $regex: q.search, $options: "i" } }));
        const rooms = yield (0, room_services_1.fetchAllRooms)(filters);
        res.status(200).json(rooms);
    }
    catch (error) {
        res.status(500);
        throw new Error("Something went wrong");
    }
}));
// Update room
exports.updatedRoom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRoom = yield (0, room_services_1.uptoDateRoom)(req.params.roomId, req.body);
        res.status(200).json(updatedRoom);
    }
    catch (error) {
        res.status(500);
        throw new Error("Something went wrong");
    }
}));
// Delete Room
exports.deleteRoom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield (0, room_services_1.deleteRoomById)(req.params.roomId);
        res.status(200).json(message);
    }
    catch (error) {
        res.status(500);
        throw new Error("Something went wrong");
    }
}));
// Get a single room using its id
exports.getRoom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield (0, room_services_1.getRoomById)(req.params.roomId);
        if (!room) {
            res.status(404);
            throw new Error("Room not found");
        }
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500);
        throw new Error("Something went wrong");
    }
}));
