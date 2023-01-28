import user from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { request, response } from "express";
// create api
const createUser = async (request, response) => {
  console.log(request.body);
  try {
    const { username, email, password } = request.body;
    if (!username || !phone || !email || !password) {
      return response.status(401).json({ error: "fill the form properly" });
    }
    const isUserExist = await user.findOne({ email });
    console.log("fgd", isUserExist);
    if (isUserExist) {
      return response
        .status(401)
        .json({ error: "Your Email is Not Verified yet" });
    }
    //hashing
    const salt = bcrypt.genSaltSync();
    const secure = await bcrypt.hash(password, salt);
    const userDetails = { username, email, phone, password: secure };
    const newEntry = await user.updateMany({ email }, userDetails);

    const addEntry = await user.create({
      username,
      email,
      password: secure,
    });

    console.log(newEntry);
    if (userDetails) {
      return response.status(201).json({
        success: true,
        data: userDetails,
        message: "created",
      });
    } else {
      return response.status(400).json({
        error: "not created",
      });
    }
  } catch (error) {
    response.status(401).json({ error: "out error" });
  }
};

// get all users
const getUsers = async (request, response) => {
  try {
    const users = await user.find({});
    console.log(users);
    if (users.length > 0) {
      response.status(200).json({
        success: true,
        data: users,
      });
    } else {
      response.status(400).json({
        success: false,
        data: "no table found",
      });
    }
  } catch (error) {
    response.status(400).json({ error });
  }
};

// get user by id

const getUserById = async (request, response) => {
  const foundUser = await user.findById(request.params.id);
  if (foundUser) {
    response.status(200).json({
      success: true,
      data: foundUser,
    });
  } else {
    response.status(404).json({
      success: false,
      data: "no particular table found",
    });
  }
};

// update the user

const updateUser = async (request, response) => {
  const _id = request.params.id;
  // console.log("jgkjv",request.params);
  try {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
      return response.status(401).json({ error: "fill properlly" });
    }
    console.log(request.body);
    console.log(_id);
    const update = await user.findByIdAndUpdate(_id, request.body);
    console.log(update);
    if (!update) {
      return response.status(401).json({ error: "process failed" });
    }
    return response.status(201).json({ message: "update successfully" });
  } catch (error) {
    return response.status(401).json({ error: "error" });
  }
};

// delete table

const deleteUser = async (request, response) => {
  const _id = request.params.id;
  try {
    const del = await user.findOneAndDelete(_id);
    console.log(del);
    if (!del) {
      return response.status(401).json({ error: "process failed" });
    }
    return response.status(201).json({ message: "deleted successfully" });
  } catch (error) {
    return response.status(401).json({ error });
  }
};
//if user follow the user
const follow = async (request, response) => {
  try {
    const followerUpdate = await user.findByIdAndUpdate(
      request.body.followId,
      {
        $push: { followers: request.user._id },
      },
      { new: true }
    );
    if (followerUpdate) {
      return response.status(201).json({
        success: true,
        data: followerUpdate,
        message: "updated",
      });
    } else {
      return response.status(401).json({ error });
    }
    const followingUpdate = await user.findByIdAndUpdate(
      request.user._id,
      {
        $push: { following: request.body.followId },
      },
      { new: true }
    );
    if (followingUpdate) {
      return response.status(201).json({
        success: true,
        data: followingUpdate,
        message: "updated",
      });
    } else {
      return response.status(401).json({ error });
    }


  } catch (error) {
    return response.status(401).json({ error });
  }
};
//if user unfollow the user
const unfollow = async (request, response) => {
  try {
    const followerUpdate = await user.findByIdAndUpdate(
      request.body.unfollowId,
      {
        $pull: { followers: request.user._id },
      },
      { new: true }
    );
    if (followerUpdate) {
      return response.status(201).json({
        success: true,
        data: followerUpdate,
        message: "updated",
      });
    } else {
      return response.status(401).json({ error });
    }
    const followingUpdate = await user.findByIdAndUpdate(
      request.user._id,
      {
        $pull: { following: request.body.unfollowId },
      },
      { new: true }
    );
    if (followingUpdate) {
      return response.status(201).json({
        success: true,
        data: followingUpdate,
        message: "updated",
      });
    } else {
      return response.status(401).json({ error });
    }


  } catch (error) {
    return response.status(401).json({ error });
  }
};

//middleware
const protectedRoute = async (request, response) => {
  response.send("ok hello");
};

export {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  protectedRoute,
  follow,
  unfollow
};
