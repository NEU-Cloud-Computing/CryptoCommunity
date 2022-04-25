import React, {useEffect, useState} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import postService from '../../services/post-service'
import commentService from '../../services/comment-service'
import coinService from '../../services/coin-service'
import userService from '../../services/user-service'
import NavBar from "../navbar";
import "../../index.css";
import "../../styles/profile-page.css";

const UserProfile = () => {
  const [postsForUser, setPostsForUser] = useState([])
  const [commentsForUser, setCommentsForUser] = useState([])
  const [coinsForUser, setCoinsForUser] = useState([])
  const [currentUser, setCurrentUser] = useState({id: '', username: '', password: ''})
  const {username} = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);


  useEffect(() => {
    findUserContent(username)
    userService.profile()
    .then((currentUser) => {
      setCurrentUser(currentUser);
      userService.checkIfAdmin(currentUser.username)
      .then((isCurrentUserAdmin) => {
        setIsCurrentUserAdmin(isCurrentUserAdmin);
      })
    })
    userService.checkIfAdmin(username)
    .then((isAdmin) => {
      setIsAdmin(isAdmin)
    })
  }, [needsUpdate])

  const history = useHistory()

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

  const makeAdmin = () => {
    userService.makeAdmin(username).then((result) => {
      setNeedsUpdate(true);
    })
    setNeedsUpdate(false);
    //window.location.reload(true)
  }

  return (
      <div>
        <NavBar/>
        <div className="register-header">
          <h1>{username}'s Profile</h1>
        </div>
        <div className="profile-user-posts">
          <h4>{username}'s Posts:</h4>
          <ul className="list-group">
          {
            postsForUser.map((post) => {

              return(
                  <li className="list-group-item post-item">
                    <Link to={`/forum/post/${post.id}`} className="navbar-brand">{post.title}</Link>
                  </li>
              )
            })
          }
          </ul>
        </div>
        <br/>
        <div className="profile-user-comments">
          <h4>{username}'s Comments:</h4>
          <ul className="list-group">
          {
            commentsForUser.map((comment) => {
              return(
                  <li className="list-group-item post-item">
                    <Link to={`/forum/post/${comment.associatedPost}`} className="navbar-brand">{comment.body}</Link>
                  </li>
              )
            })
          }
          </ul>
        </div>
        <br/>
        <div className="profile-user-coins">
          <h4>{username}'s Coins:</h4>
          <ul className="list-group">
          {
            coinsForUser.map((coin) => {

              return(
                  <li className="list-group-item post-item">
                    <Link to={`/details/${coin.coinName}`} className="navbar-brand">{coin.coinName}</Link>
                  </li>
              )
            })
          }
          </ul>
        </div>
        <br></br>
        {!isAdmin && isCurrentUserAdmin &&
        <button
            onClick={makeAdmin}
            className="btn btn-success">
          Make Admin
        </button>
        }
        <div className="profile-user-comments"></div>
        <div className="footer">
          <a href="https://www.privacypolicies.com/live/a9ccc0fc-fdec-4404-a260-4f009950b239">Privacy
            Policy</a>
          <p> <br/>
            Northeastern University CS5610</p>
        </div>
      </div>
  )
}

export default UserProfile;