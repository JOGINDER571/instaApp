import React, { useState, useEffect,useContext } from "react";
import {UserContext} from "../../App";
const Profile = () => {
  // const [image, setImage] = useState("");
  const [mypics, setPics] = useState([]);
  const {state,dispatch} =useContext(UserContext);
  // console.log("st",state);
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
              // src={state ? state.pic : "loading"}
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
              // onChange={(e) => updatePhoto(e.target.files[0])}
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
