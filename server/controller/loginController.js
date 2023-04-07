import user from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email | !password) {
      return response.status(401).json({ message: "fill completely" });
    }
    const isUserExist = await user.findOne({ email });
    if (isUserExist) {
        console.log(isUserExist);
      const checkPassword = await bcrypt.compare(
        password,
        isUserExist.password
      );
      // console.log(checkPassword);
      if (!checkPassword) {
        return response.status(401).json({ error: "check your details" });
      }
      //generate token
      const data = {
        id: isUserExist._id,
      };
      const key = process.env.JWT_KEY;
      let token = "";
      token = jwt.sign(data, key);
      //add token to the database
      // console.log(token);
      const addToken = await user.findByIdAndUpdate(
        { _id: isUserExist._id },
        { token }
      );
      const userOne = await user.findOne({ _id: isUserExist._id });
      console.log("userone",userOne);
      const {_id,username,email,followers,following} = userOne;
      if (addToken) {
        return response
          .status(201)
          .cookie("Authentication_token", token)
          .json({ message: "You have Successfully LogedIn !", token,user:{_id,username,email,followers,following} ,success:true });
      } else {
        response.status(401).json({ error: " Login Process failed !" });
      }
    }
  } catch (error) {
    return response.status(401).json(error);
  }
};

export default login;