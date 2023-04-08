import React, { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate=useNavigate();
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/create">CreatePost</Link>
        </li>,
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => {
            localStorage.clear();
            dispatch({type:"CLEAR"});
            navigate("/login")
          }}
        >
          Logout
        </button>
        </li>
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <Link to={state?"/":"/login"} className="brand-logo left">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right ">
            {renderList()}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
