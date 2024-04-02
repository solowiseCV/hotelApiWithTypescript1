import express from 'express'
import { logoutUser, signIn, signUp } from '../controllers/auth.controller';
import { validateSignIn, validateSignUp } from '../middleware/validation.middleware';

const router = express.Router();


router.post("/auth/signUp",validateSignUp,signUp);
router.post("/auth/signIn",validateSignIn,signIn);
router.post("/auth/logout",logoutUser);



export default router ;