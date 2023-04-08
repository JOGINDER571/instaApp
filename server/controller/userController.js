import posts from "../model/postModel.js";
import user from "../model/userModel.js";

// see the other user profile
const userProfile=(request,response)=>{
  
    user.findOne({_id:request.params.id}).
    select("-password").
    then(User=>{
      console.log("user",User);
        posts.find({postedby:request.params.id}).
        populate("postedby","_id username").
        exec((err,Post)=>{
            if(err){
                response.status(422).json({success:false,message:"no data"});
            }else{
                response.status(200).json({User,Post,success:true});
            }
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
}


//if user follow the user
const follow = (req, res) => {
    user.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.user._id },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        }
        user
          .findByIdAndUpdate(
            req.user._id,
            {
              $push: { following: req.body.followId },
            },
            { new: true }
          )
          .select("-password")
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      }
    );
  };
  
  //if user unfollow the user
  const unfollow = async (req, res) => {
    user.findByIdAndUpdate(
      req.body.unfollowId,
      {
        $pull: { followers: req.user._id },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        }
        user
          .findByIdAndUpdate(
            req.user._id,
            {
              $pull: { following: req.body.unfollowId },
            },
            { new: true }
          )
          .select("-password")
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      }
    );
  };
  const updatePic=async(req,res)=>{
    const findUser=await user.findByIdAndUpdate({_id:req.user._id},{$set:{pic:req.body.pic}},{new:true});
    if(!findUser){
      
      return res.status(422).json({error:"pic cannot post"});
    }
    res.json(findUser);
  }
  

  export {
    follow,
    unfollow,
    userProfile,
    updatePic
  };