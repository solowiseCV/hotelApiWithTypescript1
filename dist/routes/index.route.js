"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roomType_route_1 = __importDefault(require("./roomType.route"));
const rooms_routes_1 = __importDefault(require("./rooms.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
exports.default = (router) => {
    router.use("/v1", roomType_route_1.default);
    router.use("/v1", rooms_routes_1.default);
    router.use("/v1", auth_routes_1.default);
    return router;
};
