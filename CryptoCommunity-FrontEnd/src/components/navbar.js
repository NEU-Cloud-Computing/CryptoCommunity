import {Link, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import userService from "../services/user-service";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState({username: '', password: ''})
  useEffect(() => {
    userService.profile()
    .then((currentUser) => {
      setCurrentUser(currentUser)
    })
  }, [])
  return (
      <div className="cryptocommunity-navbar-primary">
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">Home</Link>
          <Link to="/search" className="navbar-brand">Search</Link>
          <Link to="/forum" className="navbar-brand">Forum</Link>
          <Link to="/profile" className="navbar-brand">Profile</Link>
          { currentUser.username === '' &&
          <Link to="/login" className="navbar-brand">Login</Link> }
          { currentUser.username === '' &&
          <Link to="/register" className="navbar-brand">Register</Link> }
          <a href="https://www.privacypolicies.com/live/a9ccc0fc-fdec-4404-a260-4f009950b239" className="navbar-brand">Privacy Policy</a>
          <div className="navbar-brand ml-auto">
            {currentUser.username !== '' && currentUser.username}
          </div>
        </nav>
      </div>
  )
}

export default NavBar;