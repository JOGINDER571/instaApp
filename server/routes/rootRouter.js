import express from "express";
const router = express.Router();
import reqLogin from "../middleware/requireLogin.js";
import { createUser,getUsers,getUserById, updateUser,deleteUser,protectedRoute, follow, unfollow } from "../controller/registerController.js";
import login from "../controller/loginController.js";
import { createPost, deletePost, getAllPost,myPost } from "../controller/postController.js";

//routes
router.route("/createuser").post(createUser);
router.route("/getusers").get(getUsers);
router.route("/protected").get(reqLogin,protectedRoute);
router.route("/getuser/:id").get(getUserById);
router.route("/updateuser/:id").patch(updateUser);
router.route("/deleteuser/:id").delete(deleteUser);
// follow or unfollow
router.route("/follow").put(reqLogin,follow);
router.route("/unfollow").put(reqLogin,unfollow);

//login route
router.route("/login").post(login);

//post route
router.route("/createpost").post(reqLogin,createPost);
router.route("/getposts").get(getAllPost);
router.route("/mypost").get(reqLogin,myPost);
router.route("/deletepost/:id").delete(deletePost);
export default router;