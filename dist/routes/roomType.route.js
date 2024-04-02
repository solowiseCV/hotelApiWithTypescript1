"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomType_controller_1 = require("../controllers/roomType.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/rooms-types", auth_middleware_1.protect, auth_middleware_1.adminOnly, roomType_controller_1.createRoomType);
router.delete("/rooms-types/:roomTypeId", auth_middleware_1.protect, auth_middleware_1.adminOnly, roomType_controller_1.createRoomType);
router.patch("/rooms-types/:roomTypeId", auth_middleware_1.protect, auth_middleware_1.adminOnly, roomType_controller_1.createRoomType);
router.get("/rooms-type", roomType_controller_1.getAllRoomsType);
exports.default = router;
