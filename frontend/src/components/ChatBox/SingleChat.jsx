import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatContext";
import {
  Box,
  IconButton,
  Text,
  useToast,
  FormControl,
  Input,
  Flex,
  Button,
  Image,
} from "@chakra-ui/react";
import { getuserFull, getuserName } from "../../config/Chatlogics";
import { ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import { px } from "framer-motion";

const SingleChat = () => {
  let { user, selectedChat, setSelectedChat } = ChatState();
  let [loading, setLoading] = useState(false);
  let toast = useToast();
  let [messageValue, setMessageValue] = useState();
  let [messages, setMessages] = useState([]);
  console.log("selectedChat", selectedChat);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.get(
        `http://localhost:4000/api/v1/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error fetching messages",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (e) => {
    try {
      if (e.key === "Enter" && messageValue) {
        setLoading(true);
        let config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        let data1 = {
          content: messageValue,
          chat: selectedChat._id,
        };
        setMessageValue("");
        let { data } = await axios.post(
          "http://localhost:4000/api/v1/message",
          data1,
          config
        );
        setMessages([...messages, data]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      
      setLoading(false);
      toast({
        title: "Error sending message",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleClickSend = async () => {
    if (messageValue) {
      sendMessage({ key: "Enter" });
    }
  };

  const setMessagesHandler = (e) => {
    setMessageValue(e.target.value);
  };

  return (
    <>
      {!selectedChat ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="100%"
          p={3}
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Text fontSize="1.5em">Select user to start chatting</Text>
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            h="100%"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              p={3}
              borderBottom="1px"
              borderColor="gray.200"
              alignItems="center"
            >
              <Text fontSize="1em" fontWeight="500">
                {selectedChat.isGroupChat
                  ? selectedChat.chatName.toUpperCase()
                  : getuserName(user.data._id, selectedChat.users).toUpperCase()}
              </Text>
              {selectedChat.isGroupChat ? (
                <IconButton icon={<ViewIcon />} />
              ) : (
                <ProfileModal
                  user={getuserFull(user.data._id, selectedChat.users)}
                >
                  <IconButton icon={<ViewIcon />} />
                </ProfileModal>
              )}
            </Box>
            <Box flex="1" overflowY="scroll" p={3}>
              {messages.map((message) => (
                <Box key={message._id} mb={3}>
                  <Text>{message.content}</Text>
                </Box>
              ))}
            </Box>
            <Box
              p={3}
              borderTop="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
            >
              <FormControl flex="1">
                <Input
                  onChange={setMessagesHandler}
                  onKeyDown={sendMessage}
                  value={messageValue}
                  placeholder="Enter a message"
                />
              </FormControl>
              <Button
                ml={2}
                colorScheme="green"
                onClick={handleClickSend}
                isLoading={loading}
                width={'100px'}
              >
                <i className="fa-regular fa-paper-plane"></i>
               <Image src='../../../public/send.png' height={'50px'} width={'30px'} alt='Dan Abramov' />
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default SingleChat;
