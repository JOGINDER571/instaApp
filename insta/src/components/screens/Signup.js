import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import M from 'materialize-css';
const Signup = () => {
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate=useNavigate();
  const PostData=async()=>{
    const makeReq=await fetch(`/createuser`,{
      method:'POST',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        username,
        password,
        email
      })
    });
    const res=await makeReq.json();
    console.log(res);
    if(res.success){
      M.toast({html: res.message,classes:'#2e7d32 green darken-3'})
      navigate('/login');
    }else{
      M.toast({html: res.error,classes:'#c62828 red darken-3'})
    }
  }
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload pic</span>
            {/* <input type="file" onChange={(e)=>setImage(e.target.files[0])} /> */}
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={()=>PostData()}
        >
          SignUP
        </button>
        <h5>
          <Link to="/login">Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
