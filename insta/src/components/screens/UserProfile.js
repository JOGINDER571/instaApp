import React, { useState, useEffect,useContext } from "react";
import {UserContext} from "../../App";
import { useParams } from "react-router-dom";
const UserProfile = () => {
  const {id}=useParams();
  const [userProfile,setProfile] = useState(null)
  const {state,dispatch} =useContext(UserContext);
  const [showfollow,setShowFollow] = useState(state?!state.following.includes(id):true)
  // console.log("st",state);
  useEffect(() => {
    fetch(`/user/${id}`, {
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if(result.success){
          setProfile(result);
        }
      });
  },[]);

  //follow the user
  const followUser=()=>{
    fetch(`/follow`,{
        method:"PUT",
        headers:{
            "content-type": "application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            followId:id,
        })
    }).then(res=>res.json()).then(result=>{
        console.log(result);
        dispatch({type:"UPDATE",payload:{following:result.following,followers:result.followers}});
        localStorage.setItem("user",JSON.stringify(result));
        setProfile((prevState)=>{
            console.log("prev",prevState);
            return {
                ...prevState,
                User:{
                    ...prevState.User,
                    followers:[...prevState.User.followers,result._id]
                   }
            }
        })
        setShowFollow(false);
    })
  }
  //UNFOLLOW 
  const unfollowUser=()=>{
    fetch('/unfollow',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            unfollowId:id
        })
    }).then(res=>res.json())
    .then(data=>{
        
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
         localStorage.setItem("user",JSON.stringify(data))
        
         setProfile((prevState)=>{
            const newFollower = prevState.User.followers.filter(item=>item != data._id )
             return {
                 ...prevState,
                 User:{
                     ...prevState.User,
                     followers:newFollower
                    }
             }
         })
         setShowFollow(true)
         
    })
  }
  return (
    <>
    {userProfile ?
    <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>
            <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                src={userProfile.User.pic}
                />
            </div>
            <div>
                <h4>{userProfile.User.username}</h4>
                <h5>{userProfile.User.email}</h5>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>{userProfile.Post.length} posts</h6>
                    <h6>{userProfile.User.followers.length} followers</h6>
                    <h6>{userProfile.User.following.length} following</h6>
                </div>
                {showfollow?
                <button style={{
                    margin:"10px"
                }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                 onClick={()=>followUser()}
                 >
                     Follow
                 </button>
                 : 
                 <button
                 style={{
                     margin:"10px"
                 }}
                 className="btn waves-effect waves-light #64b5f6 blue darken-1"
                 onClick={()=>unfollowUser()}
                 >
                     UnFollow
                 </button>
                  } 


            </div>
        </div>
  
        <div className="gallery">
            {
                userProfile.Post.map(item=>{
                    return(
                     <img key={item._id} className="item" src={item.pic} alt={item.title}/>  
                    )
                })
            }

        
        </div>
    </div>
    
    
    : <h2>loading...!</h2>}
    
    </>
)

};

export default UserProfile;
