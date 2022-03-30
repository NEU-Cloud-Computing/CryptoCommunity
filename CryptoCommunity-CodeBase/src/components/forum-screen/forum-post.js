import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams} from "react-router-dom";
import NavBar from "../navbar.js";
import postService from "../../services/post-service"
import commentService from "../../services/comment-service";
import userService from "../../services/user-service";
import "../../index.css";
import "../../styles/forums-posts-page.css"
import {useCallback} from "react/cjs/react.production.min";

const ForumPost = () => {
  const {postId} = useParams();
  const [currentUser, setCurrentUser] = useState({id: '', username: '', password: ''})
  const [commentsForPost, setCommentsForPost] = useState([])
  const [newComment, setNewComment] = useState([])
  const [currentPost, setCurrentPost] = useState([])
  const [isAdmin, setIsAdmin] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  const history = useHistory()

  useEffect(() => {
    userService.profile()
    .then((currentUser) => {
      setCurrentUser(currentUser)
      userService.checkIfAdmin(currentUser.username)
      .then((isAdmin) => {
        setIsAdmin(isAdmin)
      })
    })
    retrievePost()
    findComments()
  }, [needsUpdate])

  const retrievePost = () => {
    postService.findPostById(postId)
    .then((post) => {
      setCurrentPost(post)
    })
  }

  const createComment = () => {
    if (currentUser.username === '') {
      alert("You must register or login to comment")
    } else {
      commentService.createCommentForPost(postId, newComment, currentUser.username)
      .then((result => {
        setNeedsUpdate(true);
      }))
      document.getElementById("commentInput").value=("");
    }
    setNeedsUpdate(false);
  }


  //Needs Update after admin deletes post
  const deletePost = () => {
    postService.deletePost(postId);
    history.push("/forum")
  }

  const findComments = () => {
    commentService.findCommentsForPost(postId)
    .then((Results) => {
      setCommentsForPost(Results);
    })
  }

  return (
      <>
        <div className="container-fluid">
          <div className="cryptocommunity-header">
            <h1>CryptoCommunity Forums</h1>
            <h4>Engage in Conversation and Learn More About Crypto</h4>
          </div>
          <NavBar/>
          <div className="post-content">
          <h1 className="post-title">{currentPost.title}</h1>
          <h5 className="post-body">{currentPost.body}</h5>
          <h4 className="post-author">- <Link to={`/profile/${currentPost.author}`} className="navbar-brand">{currentPost.author}</Link></h4>
          </div>
          <div className="post-comments">
            <div className="comment-header">
              <h3 className="comment-header">Comments:</h3>
            </div>
            <ul className="list-group comments">
              {
                commentsForPost.map((comment) => {
                  return (
                      <li className="list-group-item comments-item">
                        {comment.body}<br/>
                        By: <Link to={`/profile/${comment.author}`} className="navbar-brand">{comment.author}</Link>
                      </li>
                  )
                })
              }
            </ul>
          </div>
          <br/>
          <div className="form-group">
            <label className="comment-header" htmlFor="commentInput">Add a Comment:</label>
            <textarea
                onChange={(event) => setNewComment(event.target.value)}
                className="form-control"
                id="commentInput"
                rows="2"></textarea>
          </div>
          <button
              onClick={createComment}
              className="btn btn-success">
            Post Comment
          </button>
          {isAdmin &&
          <button
            onClick={deletePost}
            className="btn btn-danger">
            Delete Post
          </button>
          }
          <div className="footer">
            <a href="https://www.privacypolicies.com/live/a9ccc0fc-fdec-4404-a260-4f009950b239">Privacy
              Policy</a>
            <p>Vincent Luo & Richard A. Castaneda <br/>
              Northeastern University CS5610</p>
          </div>
        </div>
      </>
  )
}

export default ForumPost;
