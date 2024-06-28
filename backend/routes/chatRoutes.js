import {Router} from "express"
import { accessChat } from "../controllers/chatControllers.js";
import auth from "../middleware/auth.js";
let chatRouter=Router()

chatRouter.post("/",auth,accessChat)

export default chatRouter;