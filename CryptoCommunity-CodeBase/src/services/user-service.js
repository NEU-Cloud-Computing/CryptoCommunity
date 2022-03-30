const REMOTE_API = "https://still-reaches-25179.herokuapp.com/api/users";

const profile = () => {
  return fetch(`${REMOTE_API}/profile`, {
    method: "POST",
    credentials: "include"
  }).then(response => response.json())
}

const findProfile = (profileId) => {
  return fetch(`${REMOTE_API}/profile/${profileId}`, {
    method: "POST",
  }).then(response => response.json())
}

const checkIfAdmin = (username) => {
  return fetch(`${REMOTE_API}/${username}/admin`, {
    method: "POST",
  }).then(response => response.json())
}

const makeAdmin = (username) => {
  return fetch(`${REMOTE_API}/${username}/makeAdmin`, {
    method: "POST",
  }).then(response => response.json())
}
const login = (credentials) => {
  return fetch(`${REMOTE_API}/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(response => response.json())
}

const register = (credentials) => {
  return fetch(`${REMOTE_API}/register`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(response => response.json())
}

const logout = () => {
  return fetch(`${REMOTE_API}/logout`, {
    method: "POST",
    credentials: "include"
  }).then(response => response.json())
}

const updateUserName = (newUsername, username) => {
  return fetch(`${REMOTE_API}/${username}/${newUsername}/updateUsername`, {
    method: "PUT",
  })
  .then(response => response.json())
}

export default {
  register, login, logout, profile, updateUserName, checkIfAdmin, makeAdmin
}