
import { NextFunction,Request,Response } from 'express';
import Joi from 'joi';

// Joi schema for signup validation
const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(5).max(20).required(),
  role:Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6),
});

// Joi schema for login validation
const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Middleware function for signup validation
export const validateSignUp = (req:Request, res:Response, next:NextFunction) => {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

// Middleware function for login validation
export const validateSignIn = (req:Request, res:Response, next:NextFunction) => {
  const { error } = signInSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};
