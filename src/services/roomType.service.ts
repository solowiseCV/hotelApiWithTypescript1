import RoomType from '../models/roomType.model';

//Checking if Roomtype already exists with same name field
export const checkExistingRoomType = async ({name}:{name:string})=>{
  const existingRoomType = await RoomType.findOne({name})
  return(existingRoomType);
};

export const saveNewRoomType = async ({ name }:{name:string}) => {
    //create room type
    const newRoomType = await RoomType.create({ name });
    return newRoomType;
};

export const uptoDateRoomType = async (roomTypeId:string|number, updateData:any) => {
  const updatedRoomType = await RoomType.findByIdAndUpdate(roomTypeId, updateData, { new: true });
  return updatedRoomType;
};

export const deleteRoomTypeById = async (roomTypeId:string|number) => {

  await RoomType.findByIdAndDelete(roomTypeId);
  return "Deleted successfully";
};
export const fetchAllRoomTypes = async () => {
    const roomTypes = await RoomType.find();
    return roomTypes;
};
