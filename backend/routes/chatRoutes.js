import {Router} from "express"

let chatRouter=Router()

chatRouter.post("/",(req,res)=>{
    res.send("Hola")
})