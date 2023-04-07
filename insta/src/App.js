import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import CretePost from "./components/screens/CreatePost";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";
export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      // if (!navigate.location.pathname.startsWith("/reset")) navigate("/signin");
      navigate("/login");
    }
  }, []);
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/create" element={<CretePost />} />
  </Routes>
  )
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
