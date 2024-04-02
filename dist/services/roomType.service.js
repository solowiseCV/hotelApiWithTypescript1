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
exports.fetchAllRoomTypes = exports.deleteRoomTypeById = exports.uptoDateRoomType = exports.saveNewRoomType = exports.checkExistingRoomType = void 0;
const roomType_model_1 = __importDefault(require("../models/roomType.model"));
//Checking if Roomtype already exists with same name field
const checkExistingRoomType = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name }) {
    const existingRoomType = yield roomType_model_1.default.findOne({ name });
    return (existingRoomType);
});
exports.checkExistingRoomType = checkExistingRoomType;
const saveNewRoomType = (_b) => __awaiter(void 0, [_b], void 0, function* ({ name }) {
    //create room type
    const newRoomType = yield roomType_model_1.default.create({ name });
    return newRoomType;
});
exports.saveNewRoomType = saveNewRoomType;
const uptoDateRoomType = (roomTypeId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRoomType = yield roomType_model_1.default.findByIdAndUpdate(roomTypeId, updateData, { new: true });
    return updatedRoomType;
});
exports.uptoDateRoomType = uptoDateRoomType;
const deleteRoomTypeById = (roomTypeId) => __awaiter(void 0, void 0, void 0, function* () {
    yield roomType_model_1.default.findByIdAndDelete(roomTypeId);
    return "Deleted successfully";
});
exports.deleteRoomTypeById = deleteRoomTypeById;
const fetchAllRoomTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const roomTypes = yield roomType_model_1.default.find();
    return roomTypes;
});
exports.fetchAllRoomTypes = fetchAllRoomTypes;
