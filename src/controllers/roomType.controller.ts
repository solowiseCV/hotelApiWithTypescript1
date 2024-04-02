import { Request,Response } from 'express';
import asyncHandler from 'express-async-handler';
import { saveNewRoomType, fetchAllRoomTypes, uptoDateRoomType,deleteRoomTypeById } from '../services/roomType.service';
import { checkExistingRoom } from '../services/room.services';

// Create RoomType
export const createRoomType = asyncHandler(async (req:Request, res:Response) => {
  const { name }:{name:string} = req.body;
  if (!name) {
    throw new Error("Fill all fields");
  }

  //checking number of charaters in name
  if (name.length < 3) {
    res.status(400);
    throw new Error("Name field must be atleaset 3 charaters")
  }

  //checking if roomType exist with same name field
  const existsRoomType = await checkExistingRoom({name})
  if(existsRoomType){
    throw new Error("Room Type already exist with same name")
  }

  
 //create roomType
  try {
    const newRoomType = await saveNewRoomType({ name });
    res.status(201).json(newRoomType);
  } catch (error) {
    res.status(500);
    throw new Error("Invalid data");
  }
});
// Update room
export const updatedRoomType = asyncHandler(async (req:Request, res:Response) => {
  try {
    const{roomTypeId}=req.params;
    const updatedRoomType = await uptoDateRoomType(roomTypeId, req.body);
    res.status(200).json(updatedRoomType);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Delete Room
export const deleteRoomTypeByIdController = asyncHandler(async (req:Request, res:Response) => {
  try {
    const roomId = req.params.roomId;
    const message = await deleteRoomTypeById(roomId);
    res.status(200).json(message);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Get All RoomTypes
export const getAllRoomsType = asyncHandler(async (req:Request, res:Response) => {
  try {
    const roomTypes = await fetchAllRoomTypes();
    res.status(200).json(roomTypes);
  } catch (error) {
    res.status(500);
    throw new Error("Room types not found");
  }
});
