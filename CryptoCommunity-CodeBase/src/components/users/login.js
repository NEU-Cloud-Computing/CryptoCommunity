import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import userService from '../../services/user-service';
import "../../index.css";
import "../../styles/login-page.css";
import NavBar from "../navbar";


const Login = () => {
  const [credentials, setCredentials] = useState({username: '', password: ''})

  const history = useHistory()

  const login = () => {
    userService.login(credentials)
    .then((user) => {
      if(user.username === "BadLogin") {
        alert("login failed, try again")
      } else {
        history.push("/profile")
      }
    })
    document.getElementById("usernameInput").value=("");
    document.getElementById("passwordInput").value=("");
  }

  return(
      <div>
        <NavBar/>
        <div className="login-header">
          <h1>Login</h1>
          Don't have an account yet? <Link className="register-link" to="/register">
          Register Here
        </Link>
        </div>
        <input
            placeholder={credentials.username}
            onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
            className="form-control"
            id="usernameInput"
            placeholder="Username"/>
        <input
            type="password"
            placeholder={credentials.password}
            onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
            className="form-control"
            id="passwordInput"
            placeholder="Password"/>
        <nav className="navbar navbar-dark bg-dark">
        <button
            onClick={login}
            className="btn btn-primary">
          Login
        </button>
        </nav>
        <div className="footer">
          <a href="https://www.privacypolicies.com/live/a9ccc0fc-fdec-4404-a260-4f009950b239">Privacy Policy</a>
          <p>Vincent Luo & Richard A. Castaneda <br/>
            Northeastern University CS5610</p>
        </div>
      </div>
  )
}

export default Login;
