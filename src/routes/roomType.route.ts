import  express from 'express';

import { createRoomType,getAllRoomsType }  from '../controllers/roomType.controller';
import { adminOnly, protect } from '../middleware/auth.middleware';
const router = express.Router();


router.post("/rooms-types",protect, adminOnly, createRoomType);
router.delete("/rooms-types/:roomTypeId",protect, adminOnly, createRoomType);
router.patch("/rooms-types/:roomTypeId",protect, adminOnly, createRoomType);
router.get("/rooms-type",getAllRoomsType);

export default router;