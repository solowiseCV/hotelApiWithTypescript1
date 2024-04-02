"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("../controllers/room.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/rooms", auth_middleware_1.protect, auth_middleware_1.adminOnly, room_controller_1.createRoom);
router.get("/rooms", room_controller_1.getAllRooms);
router.patch("/rooms/:roomId", auth_middleware_1.protect, auth_middleware_1.adminOnly, room_controller_1.updatedRoom);
router.delete("/rooms/:roomId", auth_middleware_1.protect, auth_middleware_1.adminOnly, room_controller_1.deleteRoom);
router.get("/rooms/:roomId", room_controller_1.getRoom);
exports.default = router;
