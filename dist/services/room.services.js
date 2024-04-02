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
exports.getRoomById = exports.deleteRoomById = exports.uptoDateRoom = exports.fetchAllRooms = exports.saveNewRoom = exports.checkExistingRoom = void 0;
const rooms_model_1 = __importDefault(require("../models/rooms.model"));
const checkExistingRoom = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name }) {
    const existingRoom = yield rooms_model_1.default.findOne({ name });
    return existingRoom;
});
exports.checkExistingRoom = checkExistingRoom;
const saveNewRoom = (_b) => __awaiter(void 0, [_b], void 0, function* ({ name, roomType, price }) {
    //create room
    const newRoom = yield rooms_model_1.default.create({ name, roomType, price });
    return newRoom;
});
exports.saveNewRoom = saveNewRoom;
const fetchAllRooms = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield rooms_model_1.default.find(filters);
    return rooms;
});
exports.fetchAllRooms = fetchAllRooms;
const uptoDateRoom = (roomId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRoom = yield rooms_model_1.default.findByIdAndUpdate(roomId, updateData, { new: true });
    return updatedRoom;
});
exports.uptoDateRoom = uptoDateRoom;
const deleteRoomById = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    yield rooms_model_1.default.findByIdAndDelete(roomId);
    return "Deleted successfully";
});
exports.deleteRoomById = deleteRoomById;
const getRoomById = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield rooms_model_1.default.findById(roomId).populate('roomType').exec();
    return room;
});
exports.getRoomById = getRoomById;
