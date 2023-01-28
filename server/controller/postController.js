
import posts from "../model/postModel.js";

const createPost = async (request, response) => {
  try {
    const { title, body } = request.body;
    if (!title || !body) {
      return response.status(422).json({ error: "fill properly" });
    }
    request.user.password = undefined;
    const addPost = await posts.create({
      title,
      body,
      postedby: request.user,
    });
    console.log(addPost);
    if (addPost) {
      return response.status(201).json({ 
        success: true,
        data:addPost,
        message: "successfully added post" 
    });
    } else {
      return response.status(401).json({ error: "some thing went wrong" });
    }
  } catch (error) {
    return response.status(404).json({ error: "not added.." });
  }
};

  // get all posts
  const getAllPost = async (request, response) => {
    try {
      const allPosts = await posts.find({}).populate("postedby","_id username");
    //   console.log(users);
      if (allPosts.length > 0) {
        response.status(200).json({
          success: true,
          data: allPosts,
        });
      } else {
        response.status(400).json({
          success: false,
          data: "no post found",
        });
      }
    } catch (error) {
      response.status(400).json({ error });
    }
  };

    // delete post
  
    const deletePost = async (request, response) => {
        
        const _id = request.params.id;
        console.log(_id);
        try {
            const del=await posts.findOneAndDelete(_id);
            console.log(del);
            if(!del){
                return response.status(401).json({error:"process failed"});
            }
            return response.status(201).json({message:"deleted successfully"});
    
        } catch (error) {
            return response.status(401).json({error:"wrong something"});
        }
    };
    const myPost=async(request,response)=>{
        try {
            const allMyPost = await posts.find({postedby:request.user._id}).populate("postedby","_id username");
          //   console.log(users);
            if (allMyPost.length > 0) {
              response.status(200).json({
                success: true,
                data: allMyPost,
              });
            } else {
              response.status(400).json({
                success: false,
                data: "no post found",
              });
            }
          } catch (error) {
            response.status(400).json({ error });
          }
    }
export { createPost,getAllPost,deletePost,myPost };
