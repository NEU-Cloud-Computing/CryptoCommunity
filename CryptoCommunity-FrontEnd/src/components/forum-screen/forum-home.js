import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import NavBar from "../navbar.js";
import postService from "../../services/post-service";
import userService from "../../services/user-service";
import "../../index.css";

const ForumScreen = () => {

  const [currentUser, setCurrentUser] = useState({username: '', password: ''});
  const [recentPosts, setRecentPosts] = useState([]);
  const [newPost, setNewPost] = useState({body: '', title: ''});
  const [newTitle, setNewTitle] = useState({title:""});
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    findRecentPosts()
  }, [needsUpdate])

  useEffect(() => {
    userService.profile()
    .then((currentUser) => {
      setCurrentUser(currentUser)
    })
  }, [])

  const createPost = () => {
    if (currentUser.username === '') {
      alert("You must register or login to post")
    } else {
      postService.createPostForUser(currentUser.username, newPost).then((results) => {
        setNeedsUpdate(true);
      })
      document.getElementById("bodyInput").value=("");
      document.getElementById("titleInput").value=("");
    }
    setNeedsUpdate(false);
  }

  const findRecentPosts = () => {
    postService.findRecentPosts()
    .then((Results) => {
      setRecentPosts(Results);
    })
  }

  return(
      <>
        <div className="container-fluid">
          <div className="cryptocommunity-header">
            <h1>CryptoCommunity Forums</h1>
            <h4>Engage in Conversation and Learn More About Crypto</h4>
          </div>
          <NavBar/>
          <div className="recent-posts">
            <ul className="list-group">
              {
                recentPosts.map((post) => {
                  return(
                      <li className="list-group-item post-item">
                        <Link to={`/forum/post/${post.id}`} className="navbar-brand">{post.title}</Link>
                        By: <Link to={`/profile/${post.author}`} className="navbar-brand">{post.author}</Link>
                      </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="form-group">
            <label htmlFor="titleInput">Title:</label>
            <textarea
                onChange={(event) => setNewTitle(event.target.value)}
                className="form-control"
                id="titleInput"
                rows="1">
            </textarea>
          </div>
          <div className="form-group">
            <label htmlFor="bodyInput">Body:</label>
            <textarea
                onChange={(event) => setNewPost({body: event.target.value, title: newTitle})}
                className="form-control"
                id="bodyInput"
                rows="3"></textarea>
          </div>
          <button
              onClick={createPost}
              className="btn btn-success">
            Create Post
          </button>
          <div className="footer">
            <a href="https://www.privacypolicies.com/live/a9ccc0fc-fdec-4404-a260-4f009950b239">Privacy Policy</a>
            <p><br/>
              Northeastern University CS5610</p>
          </div>
        </div>
      </>
  )
}

export default ForumScreen;