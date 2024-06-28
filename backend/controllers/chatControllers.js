import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";

//description   create or fetch one-on -one chat
//Path          POST/api/v1/chat
//access        Private

export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.status(400);
  }

  let isChat=await Chat.find({
    isGroupChat:false,
    $and:[{users:{$elemMatch:{$eq:userId}}},{users:{$elemMatch:{$eq:req.userId}}}]
}).populate("users","-password","-confirmPassword").populate("latestMessage")

isChat=await Chat.populate(isChat,{
    path:"latestMessage.sender",
    select:"name email photo"
})

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "Sender",
      isGroupChat: false,
      users: [req.userId, userId],
    };

    try {
      let newChat = await Chat.create(chatData);

      newChat = await Chat.findById(newChat._id)
        .populate("users", "name email photo")
        .populate("latestMessage");

      res.status(200).send(newChat);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
});
