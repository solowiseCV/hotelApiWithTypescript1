import {Request,Response} from 'express';
import bcryptjs from "bcryptjs";
import jwt  from "jsonwebtoken";
import asyncHandler from"express-async-handler";
import { checkExistingUser, checkUserEmailExist, createUser, loginUser } from '../services/auth.services';



const generateToken = (id:any)=>{
// REMOVE THE CONDITIONAL STATEMENT WHEN YOU ADD A .ENV FILE WITH THE MONGOOSE STRING
  if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn: "1d"
  })
}
//Register
export const signUp = asyncHandler(async (req:Request,res:Response) =>{
 const {email,name,password,role}:{email:string, name:string,password:string,role:string} = req.body;
 //validation
 
 if(!email || !name || !password ){
    res.status(400)
    throw new Error("please fill all required fields")
 }
 const hashedPassword = bcryptjs.hashSync(password,10)

 //checking if user exists
 const existingUser = await checkExistingUser({email});
if(existingUser){
  res.status(409);
  throw new Error("User already exists,Please sign in");
}


//creating a new user
const user = await createUser(
  {name,
  email,
  password:hashedPassword,
role:"default"
});

//generate token
const token = generateToken(user._id)
if(user){
  const {_id, name, email}= user;
res.cookie("token", token,{
  path: "/",
  httpOnly: true,
  expires: new Date(Date.now()+ 1000 * 86400),
  //secure:true,
  //sameSite: none,
})
try {
  await user.save()
  res.status(201).json({
     _id, name, email,
    })
} catch (error) {
  res.status(500);
throw new Error("Something went wrong")
}

}

res.status(201).json(user);


})

//login user
export const signIn = asyncHandler( async(req:Request,res:Response)=>{
  const { email, password}:{email:string, password:string} = req.body
  if(!email || !password){
    res.status(400)
    throw new Error("Fill all fields...")
  }
  
    
  const user = await checkUserEmailExist({email});
  if(!user){
    res.status(404)
    throw new Error("User not found")
  }
  const validPassword = await bcryptjs.compare( password, user.password);

  const token = generateToken(user._id)
  if(validPassword){

    try {
      const newUser = await loginUser({email});

    res.cookie("token", token,{
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now()+ 1000 * 86400),
      //secure:true,
      //sameSite: none,
    });
    res.status(200).json(newUser);
   
    } catch (error) {
      res.status(500);
      throw new Error("Something went wrong")
    }
  
  }
  
}) ;

//logout
export const logoutUser = asyncHandler(async (req:Request,res:Response)=>{
  
  res.clearCookie("token",{
   
  });
  res.status(200).json({message: "Succesfully logged out now..."})
});


