import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import userService from '../../services/user-service'
import postService from '../../services/post-service'
import commentService from '../../services/comment-service'
import coinService from '../../services/coin-service'
import NavBar from "../navbar";
import "../../index.css";
import "../../styles/profile-page.css";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({username: '', password: ''})
  const [updatedUserName, setUpdatedUserName] = useState({username: ''})
  const [updatedPassword, setUpdatedPassword] = useState({password: ''})
  const [postsForUser, setPostsForUser] = useState([])
  const [commentsForUser, setCommentsForUser] = useState([])
  const [coinsForUser, setCoinsForUser] = useState([])
  let username = "";

  useEffect(() => {
    userService.profile()
    .then((currentUser) => {
      setCurrentUser(currentUser)
      findUserContent(currentUser.username)
    })
  }, [])

  const history = useHistory()

  const logout = () => {
    userService.logout();
    history.push("/")
  }

  // const updateUserName = () => {
  //   const newUser = {
  //     ...currentUser,
  //     username: updatedUserName
  //   }
  //   userService.updateUserName(newUser, currentUser.username)
  //   userService.logout();
  //   history.push("/login")
  // }

  const updateUserName = () => {
    userService.updateUserName(updatedUserName, currentUser.username)
    userService.logout();
    history.push("/login")
  }

  const findUserContent = (username) => {
    postService.findPostsForUser(username)
    .then((posts) => {
      setPostsForUser(posts)
    })
    commentService.findCommentsForUser(username)
    .then((comments) => {
      setCommentsForUser(comments)
    })
    coinService.findCoinsForUser(username)
    .then((coins) => {
      setCoinsForUser(coins)
    })
  }

  return (
      <div>
        <NavBar/>
        {currentUser.username === "" ?
            <div>
              Please <Link className="login-link" to="/login">
              Login
            </Link> or <Link className="register-link" to="/register">
              Register
            </Link>
            </div> :
            <div>
              <div className="profile-header">
                <h1>Profile</h1>
                <h4>Welcome {currentUser.username}</h4>
              </div>
              <p>Change Your Username & Password:</p>
              <p>*You'll need to login again after changing your username or
                password*</p>
              <input
                  placeholder="New Username"
                  onChange={(event) => setUpdatedUserName(event.target.value)}/>
              <br/>
              <input
                  placeholder="New Password"
                  onChange={(event) => setUpdatedPassword(event.target.value)}/>
              <br/>
              <button
                  onClick={updateUserName}
                  className="btn btn-primary">
                Update
              </button>
              <button
                  onClick={logout}
                  className="btn btn-danger float-right">
                Logout
              </button>
              <br/>
              <div className="profile-user-posts">
                <h4>My Posts:</h4>
                <ul className="list-group">
                  {
                    postsForUser.map((post) => {
                      return (
                          <li className="list-group-item post-item">
                            <Link to={`/forum/post/${post.id}`}
                                  className="navbar-brand">{post.title}</Link>
                          </li>
                      )
                    })
                  }
                </ul>
              </div>
              <br/>
              <div className="profile-user-comments">
                <h4>My Comments:</h4>
                <ul className="list-group">
                  {
                    commentsForUser.map((comment) => {
                      return (
                          <li className="list-group-item post-item">
                            <Link to={`/forum/post/${comment.associatedPost}`}
                                  className="navbar-brand">{comment.body}</Link>
                          </li>
                      )
                    })
                  }
                </ul>
              </div>
              <br/>
              <div className="profile-user-coins">
                <h4>My Coins:</h4>
                <ul className="list-group">
                  {
                    coinsForUser.map((coin) => {
                      return (
                          <li className="list-group-item post-item">
                            <Link to={`/details/${coin.coinName}`}
                                  className="navbar-brand">{coin.coinName}</Link>
                          </li>
                      )
                    })
                  }
                </ul>
              </div>
              <br/>
              <div className="profile-user-comments"></div>
              <div className="footer">
                <a href="https://www.privacypolicies.com/live/a9ccc0fc-fdec-4404-a260-4f009950b239">Privacy
                  Policy</a>
                <p><br/>
                  Northeastern University CS5610</p>
              </div>
            </div>
        }
      </div>
  )
}

export default Profile;
