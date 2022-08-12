import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./component/Lobby";
import Login from "./component/Login";
import Register from "./component/Register";
import ResetPassword from "./component/ResetPassword";
import { AuthContext } from "./auth/AuthContext";
import Profile from "./component/Profile";

function App() {
  let fromStorage = localStorage.getItem("session");
  if (fromStorage) {
    fromStorage = JSON.parse(fromStorage);
  }

  const [session, setSession] = useState({
    isAuth: fromStorage ? fromStorage.isAuth : false,
    token: fromStorage ? fromStorage.token : undefined,
    userId: fromStorage ? fromStorage.userId : undefined,
    username: fromStorage ? fromStorage.username : undefined,
    email: fromStorage ? fromStorage.email : undefined,
    ava: fromStorage ? fromStorage.ava : undefined,
  });

  const { fetch: originalFetch } = window;
  // window.fetch = async (...args) => {
  //   let [resource, config] = args;
  //   let response = await originalFetch(resource, config).catch((error) => {
  //     if (error.message === "Failed to fetch") {
  //       alert("server is unavailable");
  //       return;
  //     }
  //   });

  //   if (response && response.status === 401) {
  //     localStorage.clear();
  //     // window.location.href = "/login";
  //     return Promise.reject(response);
  //   }
  //   return response;
  // };

  return (
    <div className="App">
      <AuthContext.Provider value={{ session, setSession }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route
              path="/profile"
              element={session.isAuth ? <Profile /> : <Login />}
            />
            <Route
              path="/lobby"
              element={session.isAuth ? <Lobby /> : <Login />}
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
