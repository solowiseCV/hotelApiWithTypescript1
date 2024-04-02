import User from '../models/user.model';


export const checkExistingUser = async ({email}:{email:string})=>{
  const userExists = await User.findOne({email});
  return userExists
};

export const createUser = async ({name,email,password,role }:{
  name:string,
  email:string,
  password:string,
  role:string
}) => {
   
    const newUser =  new User({ name,email,password,role });
    return newUser;
};

export const checkUserEmailExist = async ({email}:{email:string}) => {
    const exists = await User.findOne({ email});
    return exists;
};

export const loginUser = async ({email}:{email:string})=>{
  const user = await User.findOne({email});
  return user;
};