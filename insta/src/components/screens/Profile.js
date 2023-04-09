import React, { useState, useEffect,useContext } from "react";
import {UserContext} from "../../App";
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const {state,dispatch} =useContext(UserContext);
  const [image,setImage]=useState("");
  console.log("st",state);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if(result.success){
          setPics(result.data);
        }
      });
  },[]);
  // 
  // update pic
  useEffect(()=>{
    if(image){
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dnijugslc");
      fetch(
        `https://api.cloudinary.com/v1_1/dnijugslc/image/upload`,
        {
          method: "POST",
          body: data,
        }
      ).then(res=>res.json()).then(data=>{
        //
        fetch("/updatepic",{
          method:"put",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            pic:data.url
          })
        }).then(res=>res.json()).then(result=>{
          console.log(result);
          dispatch({type:"UPDATEPIC",payload:result.pic});
          localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}));
        })
      })
    }
  },[image]);

  const updatePhoto=(file)=>{
    setImage(file);
  }

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : "loading"}
              alt="no img"
            />
          </div>
          <div>
            <h4>{state ? state.username : "loading"}</h4>
            <h5>{state ? state.email : "loading"}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>{mypics.length} posts</h6>
              <h6>{state ? state.followers.length : "0"} followers</h6>
              <h6>{state ? state.following.length : "0"} following</h6>
            </div>
          </div>
        </div>

        <div className="file-field input-field" style={{ margin: "10px" }}>
          <div className="btn #64b5f6 blue darken-1">
            <span>Update pic</span>
            <input
              type="file"
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics?.length!=0 ? mypics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.pic}
              alt={item.title}
            />
          );
        }):<><p>No Post found</p></>}
      </div>
    </div>
  );
};

export default Profile;
