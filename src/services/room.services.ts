
import Room from '../models/rooms.model';


export const checkExistingRoom = async ({name}:{name:string})=>{
   const existingRoom = await Room.findOne({name});
   return existingRoom
}

export const saveNewRoom = async ({name,roomType,price }:{name:string,roomType:string,price:number}) => {
   
  //create room
    const newRoom = await Room.create({ name,roomType,price });
    return newRoom;
  
};

export const fetchAllRooms = async (filters:any)=> {
     const rooms = await Room.find(filters);
    return rooms;
  
};

export const uptoDateRoom = async (roomId:string|number, updateData:any) => {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, updateData, { new: true });
    return updatedRoom;
};

export const deleteRoomById = async (roomId:string|number) => {
  
    await Room.findByIdAndDelete(roomId);
    return "Deleted successfully";
};

export const getRoomById = async (roomId:string|number) => {
    const room = await Room.findById(roomId).populate('roomType').exec();
    return room;
 
};
