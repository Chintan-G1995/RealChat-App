import { Router } from "express";
import auth from "../middleware/auth.js";
import { accessChat, createGroup, fetchChats } from "../controllers/chatControllers.js";

let chatRouter=Router()

chatRouter.post("/",auth,accessChat);
chatRouter.get("/",auth,fetchChats);
chatRouter.post("/group",auth,createGroup);


export default chatRouter;