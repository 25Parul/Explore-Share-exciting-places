import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Users from "./user/pages/Users";
import Nav from "./shared/components/Navigation/Nav";
import NewPlace from "./places/pages/NewPlace";
import { AuthContext } from './shared/context/auth-context';
import Auth from './user/pages/Auth';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false)
  
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null)
  }, []);


  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/:userId/places" element={<UserPlaces />} />
      <Route path="/places/new" element={<NewPlace />} />
      <Route path="/places/:placeId" element={<UpdatePlace />} />
    </Routes>
    );
  } else {
    routes= (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <>

    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
    >
    <Router>
    <Nav />
    <main>{routes}</main>
    </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
