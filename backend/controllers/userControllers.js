import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { genToken } from "../utils/generateToken.js";

//register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const existingUser = await User.findOne({ email });
  console.log(name, email, password, confirmPassword);
  if (existingUser) {
    throw new Error("User exists already");
  }
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    photo: req.file.path,
  });
  let token = await genToken(newUser._id);
  res.status(201).json({
    status: "Success",
    data: newUser,
    token,
  });
});

//login
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (
    !existingUser ||
    !(await existingUser.comparePassword(password, existingUser.password))
  ) {
    let err = new Error("No user found,Please Register");
    next(err);
  }
  let token = await genToken(existingUser._id);
  res.status(200).json({
    status: "Success",
    data: existingUser,
    token,
  });
});

export const searchUsers = asyncHandler(async (req, res, next) => {
  let userId = req.userId;
  let keyword = req.query.search
    ? {
        or$: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  let users = await User.find(keyword)
    .find({ _id: { $ne: userId } })
    .exec();
  if (!users) {
    let err = new Error("Users not found");
    next(err);
  }
  res.status(200).json(users);
});
