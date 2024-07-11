import {
  Avatar,
  Box,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const Chatnav = ({ user }) => {
  const { isOpen:isDrawerOpen, onOpen:onDrawerOpen, onClose:onDrawerClose } = useDisclosure();
  const { isOpen:isModelOpen, onOpen:onModelOpen, onClose:onModelClose } = useDisclosure();
  const btnRef = useRef();
const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("user")
    navigate("/",{replace:true})
  }
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding={"1em"}
      alignItems={"center"}
      boxShadow={"5px 5px 5px rgba(0,0,0,0.8)"}
      backgroundColor={"#128c7e"}

    >
      <Button leftIcon={<SearchIcon />} ref={btnRef} onClick={onDrawerOpen} width={100} color={'white'}>
        Search
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={onDrawerClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search users</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Text><img src="../../../public/chaiq-logo.gif" alt="" /></Text>
      <Box
        display={"flex"}
        gap={"1em"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Menu>
          <MenuButton as={Button}>
            <BellIcon w={8} h={5} />
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar name={user.data.name} src={user.data.photo} size={"sm"} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onModelOpen} >Profile</MenuItem>

            <Modal isOpen={isModelOpen} onClose={onModelClose}>
        <ModalOverlay />
        <ModalContent textAlign={"center"}>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={"1em"}>
            <Text fontSize={"2xl"}>{user.data.email}</Text>
            <Avatar name={user.data.name} src={user.data.photo} size="2xl" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onModelClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            <MenuDivider/>
            <MenuItem onClick={logout} color={'white'}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Chatnav;