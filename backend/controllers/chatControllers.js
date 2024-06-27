import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";

//description   create or fetch one-on -one chat
//Path          POST/api/v1/chat
//access        Private

export const accessChat=asyncHandler(async(req,res)=>{
    const {userId}=req.body;

    if(!userId){
        console.log("UserId param not sent with request");
        return res.status(400);
    }

    var isChat=await Chat.find({
        isGroupChat:false,
        users:{$all:[req.user._id,userId]}
    }).populate("users","-password").populate("latestMessage")

    isChat=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email"
    })

    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        }

        try{
            const createdChat=await Chat.create(chatData)

            const FullChat=await Chat.findOne({_id:createdChat._id}).populate(
                "users",
                "-password"
            )
            res.status(200).send(FullChat)
        }catch(error){
            console.error(error);
            res.status(400).json({error:error.message})
        }
    }
})