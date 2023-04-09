import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../App";
const Login = () => {
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const {state,dispatch}=useContext(UserContext);
  const navigate = useNavigate();
  const PostData = async () => {
    try {
      const makeReq = await fetch(`/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          password,
          email,
        }),
      });
      const res = await makeReq.json();
      if (res.error) {
        console.log("error");
        M.toast({ html: res.error, classes: "#c62828 red darken-3" });
      } else {
        localStorage.setItem("jwt", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        dispatch({type:"USER",payload:res.user});
        // console.log(res);
        M.toast({
          html: "Login Successfully",
          classes: "#2e7d32 green darken-3",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
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
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
          Login
        </button>
        <h5>
          <Link to="/signup">Do not have an account ?</Link>
        </h5>
        <h6>
          {/* <Link to="/reset">Forgot password ?</Link> */}
        </h6>
      </div>
    </div>
  );
};

export default Login;
