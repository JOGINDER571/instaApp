import React,{useState,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom';
import { UserContext } from '../../App';

const Home = () => {

  const [data,setData] =useState([]);
  const {state,dispatch}=useContext(UserContext);
  const api_Url='https://insta-app-2.vercel.app/user';
  useEffect(()=>{
    fetch(`${api_Url}/getposts`,{
      method:"GET",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then((res)=>res.json()).then(result=>{
      console.log(result);
      if(result.success){
        setData(result.data);
      }
    })

  },[])

  //like the post
  const likePost=(id)=>{
    fetch(`${api_Url}/like`,{
      method:"put",
      headers:{
        "content-type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id,
      })
    }).then(res=>res.json()).then(result=>{
      console.log(result);
      const newData=data.map((item)=>{
        if(item._id==result?.data?._id){
          return result.data;
        }else{
          return item;
        }
      })
      setData(newData);
    })
  }
  //unlike the post
  const unlikePost=(id)=>{
    fetch(`${api_Url}/unlike`,{
      method:"put",
      headers:{
        "content-type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id,
      })
    }).then(res=>res.json()).then(result=>{
      console.log(result);
      const newData=data.map((item)=>{
        if(item._id==result?.data?._id){
          return result.data;
        }else{
          return item;
        }
      })
      setData(newData);
    })
  }
  //comments
  const makeComment=(text,id)=>{
    fetch(`${api_Url}/comment`,{
      method:"put",
      headers:{
        "content-type":"application/json", 
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        text,
        postId:id,
      })
    }).then(res=>res.json()).then(result=>{
      const newData=data.map((item)=>{
        if(item._id==result?.data?._id){
          return result.data;
        }else{
          return item;
        }
      })
      setData(newData);
    })
  }
  //delete post
  const deletePost=(id)=>{
    fetch(`${api_Url}/deletepost/${id}`,{
      method:"delete",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json()).then(result=>{
      console.log(result);
      const newData=data.filter((item)=>{
        return item._id !==result._id;
      })
      setData(newData);
      // console.log(newData);
    }).catch((error)=>{
      console.log(error);
    })
  }
    return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5 style={{ padding: "5px" }}>
              <Link
                to={
                  item.postedby._id !== state._id
                    ? "/profile/" + item.postedby._id
                    : "/profile"
                }
              >
                {item.postedby.username}
              </Link>{" "}
              {item.postedby._id == state._id && (
                <i
                  className="material-icons"
                  style={{
                    float: "right",
                  }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={item.pic} />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item?.likes?.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "500" }}>
                      {record.postedby.username}
                    </span>{" "}
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // console.log(e.target[0].value);
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        );
      })} 
    </div>
  );
};

export default Home;
