const REMOTE_API = "https://still-reaches-25179.herokuapp.com/api";

export const createPostForUser = (userId, newPost) =>
    fetch(`${REMOTE_API}/users/${userId}/posts`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())

export const updatePostForUser = (postId, post) =>
    fetch(`${REMOTE_API}/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify(post),
      headers: {
        'content-type': 'application/json'

      }
    })
    .then(response => response.json())

export const deletePost = (postId) =>
    fetch(`${REMOTE_API}/posts/${postId}`, {
      method: "DELETE"
    })
    .then(response => response.json())

export const findPostsForUser = (userId) =>
    fetch(`${REMOTE_API}/users/${userId}/userPosts/`)
    .then(response => response.json())

export const findRecentPosts = () =>
    fetch(`${REMOTE_API}/posts`)
    .then(response => response.json())

export const findPostById = (postId) =>
    fetch(`${REMOTE_API}/getPost/${postId}`)
    .then(response => response.json())

export default {
  findPostsForUser,
  createPostForUser,
  deletePost,
  updatePostForUser,
  findRecentPosts,
  findPostById
};

