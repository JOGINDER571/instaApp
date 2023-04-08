import express from "express";
const router = express.Router();
import reqLogin from "../middleware/requireLogin.js";
import { createUser,getUsers,getUserById, updateUser,deleteUser,protectedRoute} from "../controller/registerController.js";
import login from "../controller/loginController.js";
import { commentPost, createPost, deletePost, getAllPost,getAllSubPost,likePost,myPost, unlikePost } from "../controller/postController.js";
import {follow, unfollow,userProfile,updatePic } from "../controller/userController.js";
//routes
router.route("/createuser").post(createUser);
router.route("/getusers").get(getUsers);
router.route("/protected").get(reqLogin,protectedRoute);
router.route("/getuser/:id").get(getUserById);
router.route("/updateuser/:id").patch(updateUser);
router.route("/deleteuser/:id").delete(deleteUser);

// follow or unfollow and other user
router.route("/user/:id").get(reqLogin,userProfile);
router.route("/follow").put(reqLogin,follow);
router.route("/unfollow").put(reqLogin,unfollow);
router.route("/updatepic").put(reqLogin,updatePic);

//login route
router.route("/login").post(login);

//post route
router.route("/createpost").post(reqLogin,createPost);
router.route("/getposts").get(reqLogin,getAllPost);
router.route("/mypost").get(reqLogin,myPost);
router.route("/deletepost/:id").delete(reqLogin,deletePost);
router.route("/like").put(reqLogin,likePost);
router.route("/unlike").put(reqLogin,unlikePost);
router.route("/comment").put(reqLogin,commentPost);
router.route("/getsubpost").get(reqLogin,getAllSubPost)
export default router;