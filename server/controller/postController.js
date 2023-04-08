import posts from "../model/postModel.js";

const createPost = async (request, response) => {
  try {
    const { title, body, pic } = request.body;
    if (!title || !body || !pic) {
      return response.status(422).json({ error: "fill properly" });
    }
    // request.user.password = undefined;
    const addPost = await posts.create({
      title,
      body,
      pic,
      postedby: request.user,
    });
    // console.log(addPost);
    if (addPost) {
      return response.status(201).json({
        success: true,
        data: addPost,
        message: "successfully added post",
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
    const allPosts = await posts.find({}).populate("postedby", "_id username").populate("comments.postedby", "_id username");
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
// get all posts
const getAllSubPost = async (request, response) => {
  try {
    const allPosts = await posts.find({postedby:{$in:request.user.following}}).populate("postedby", "_id username").populate("comments.postedby", "_id username");
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
  posts.findOne({_id:request.params.id})
    .populate("postedby","_id")
    .exec((err,post)=>{ 
        if(err || !post){
            return response.status(422).json({error:err})
        }
        if(post.postedby._id.toString() === request.user._id.toString()){
              post.remove()
              .then(result=>{
                  response.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })

};
const myPost = async (request, response) => {
  try {
    const allMyPost = await posts
      .find({ postedby: request.user._id })
      .populate("postedby", "_id username");
    // console.log("allMyPost", allMyPost);
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
};

const likePost = async (request, response) => {
  try {
    const findPost = await posts.findByIdAndUpdate(
      request.body.postId,
      {
        $push: { likes: request.user._id },
      },
      {
        new: true,
      }
    );
    if(findPost){
      response.status(200).json({
        success: true,
        data: findPost,
      })
    }else{
      response.status(422).json({
        success: false,
        message:"not updated"
      })
    }
  } catch (error) {
    response.status(422).json({error:error});
  }
};
const unlikePost = async (request, response) => {
  try {
    const findPost = await posts.findByIdAndUpdate(
      request.body.postId,
      {
        $pull: { likes: request.user._id },
      },
      {
        new: true,
      }
    );
    if(findPost){
      response.status(200).json({
        success: true,
        data: findPost,
      })
    }else{
      response.status(422).json({
        success: false,
        message:"not updated"
      })
    }
  } catch (error) {
    response.status(422).json({error:error});
  }
};
//comments

const commentPost = async (request, response) => {
  try {
    const comment={
      text:request.body.text,
      postedby:request.user._id
    }
    const findPost = await posts.findByIdAndUpdate(
      request.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    ).populate("comments.postedby","_id username");

    if(findPost){
      response.status(200).json({
        success: true,
        data: findPost,
      })
    }else{
      response.status(422).json({
        success: false,
        message:"not updated comments"
      })
    }
  } catch (error) {
    response.status(422).json({error:error});
  }
};



export { createPost, getAllPost, deletePost, myPost,likePost,unlikePost,commentPost,getAllSubPost };
