import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import { Request,Response,NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any; // Customize the type of 'user' property as per your requirements
}

  export  const protect = asyncHandler( async (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    try {
         const token = req.cookies.token; 
         if(!token){
            res.status(401);
            throw new Error("Not authorized, please login")

         }

         //verify token
         if(!process.env.JWT_SECRET){
          throw new Error("JWT NOT DEFINED  ")}
         
         const verify = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
         //get user id from token
         const user = await User.findById(verify.id).select("-password")
                 if(!user){
                    res.status(401);
                    throw new Error("User not Found");
                 }
                 req.user = user
                 next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized,please login")
    }
});

//Admin only
export const adminOnly = (req:AuthenticatedRequest,res:Response,next:NextFunction) =>{
    if(req.user && req.user.role === "admin"){
        next()
    }
   else{
    res.status(401);
    throw new Error("Not authorized to perfume this action")
   }

}

export const verifyToken = (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    const authHeader = req.headers.token;
    if (typeof authHeader==="string" && authHeader ==="Bearer"){ 
      const token = authHeader.split(" ")[1];
      if(!process.env.JWT_SECRET){
        throw new Error("JWT NOT DEFINED  ")}
      jwt.verify(token, process.env.JWT_SECRET, (err:any, user:any) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };


  

