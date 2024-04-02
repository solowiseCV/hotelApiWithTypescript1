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
exports.getAllRoomsType = exports.deleteRoomTypeByIdController = exports.updatedRoomType = exports.createRoomType = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const roomType_service_1 = require("../services/roomType.service");
const room_services_1 = require("../services/room.services");
// Create RoomType
exports.createRoomType = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        throw new Error("Fill all fields");
    }
    //checking number of charaters in name
    if (name.length < 3) {
        res.status(400);
        throw new Error("Name field must be atleaset 3 charaters");
    }
    //checking if roomType exist with same name field
    const existsRoomType = yield (0, room_services_1.checkExistingRoom)({ name });
    if (existsRoomType) {
        throw new Error("Room Type already exist with same name");
    }
    //create roomType
    try {
        const newRoomType = yield (0, roomType_service_1.saveNewRoomType)({ name });
        res.status(201).json(newRoomType);
    }
    catch (error) {
        res.status(500);
        throw new Error("Invalid data");
    }
}));
// Update room
exports.updatedRoomType = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomTypeId } = req.params;
        const updatedRoomType = yield (0, roomType_service_1.uptoDateRoomType)(roomTypeId, req.body);
        res.status(200).json(updatedRoomType);
    }
    catch (error) {
        res.status(500);
        throw new Error("Something went wrong");
    }
}));
// Delete Room
exports.deleteRoomTypeByIdController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = req.params.roomId;
        const message = yield (0, roomType_service_1.deleteRoomTypeById)(roomId);
        res.status(200).json(message);
    }
    catch (error) {
        res.status(500);
        throw new Error("Something went wrong");
    }
}));
// Get All RoomTypes
exports.getAllRoomsType = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomTypes = yield (0, roomType_service_1.fetchAllRoomTypes)();
        res.status(200).json(roomTypes);
    }
    catch (error) {
        res.status(500);
        throw new Error("Room types not found");
    }
}));
