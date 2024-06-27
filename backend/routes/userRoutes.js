import {Router} from 'express';
import { login,register,searchUsers } from '../controllers/userControllers.js';
import upload from '../middleware/uploadFile.js';
import auth from '../middleware/auth.js';

let userRouter=Router()

userRouter.post("/register",upload.single('photo'),register)
userRouter.post("/login",login)
userRouter.get("/",auth,searchUsers)


export default userRouter;