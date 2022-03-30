import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import userService from '../../services/user-service'
import "../../index.css";
import "../../styles/register-page.css";
import NavBar from "../navbar";

const Register = () => {
  const [credentials, setCredentials] = useState({username: '', password: ''})
  const history = useHistory()
  const register = () => {
    userService.register(credentials)
    .then((user) => {
      console.log(user)
      if(user === 0) {
        alert("username already taken")
      } else {
        history.push("/profile")
      }
    })
  }
  return(
      <div>
        <NavBar/>
        <div className="register-header">
          <h1>Register</h1>
          Already have an account? <Link className="login-link" to="/login">
          Login Here
        </Link>
          <p>All new accounts agree to the Terms and Conditons. Accounts and posts may be removed by moderators at any time</p>
        </div>
        <input
            value={credentials.username}
            onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
            className="form-control"
            placeholder="Username"/>
        <input
            value={credentials.password}
            onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
            className="form-control"
            placeholder="Password"/>
        <nav className="navbar navbar-dark bg-dark">
        <button onClick={register} className="btn btn-primary">
          Register
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

export default Register;
