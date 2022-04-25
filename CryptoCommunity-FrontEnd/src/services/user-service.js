const REMOTE_API = "http://Cryptocommunitypreflighttest-env.eba-qq5djyka.us-west-2.elasticbeanstalk.com/api/users";

const profile = () => {
  return fetch(`${REMOTE_API}/profile`, {
    method: "POST", //POST
    credentials: "include"
  }).then(response => response.json())
}

const findProfile = (profileId) => {
  return fetch(`${REMOTE_API}/${profileId}`, {
    method: "POST",//POST
      }).then(response => response.json())
}

const checkIfAdmin = (username) => {
  return fetch(`${REMOTE_API}/${username}/admin`, {
    method: "POST", //POST
  }).then(response => response.json())
}

const makeAdmin = (username) => {
  return fetch(`${REMOTE_API}/${username}/makeAdmin`, {
    method: "POST",//POST
  }).then(response => response.json())
}
const login = (credentials) => {
  return fetch(`${REMOTE_API}/login`, {
    method: "POST", //POST
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
    method: "POST", //POST
    credentials: "include",
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(response => response.json())
}

const logout = () => {
  return fetch(`Cryptservertest-env.eba-2fawjves.us-west-2.elasticbeanstalk.com/api/logout`, {
    method: "POST",
    credentials: "include"
  }).then(response => response.json())
}

const updateUserName = (newUsername, username) => {
  return fetch(`Cryptservertest-env.eba-2fawjves.us-west-2.elasticbeanstalk.com/api/${username}/${newUsername}/updateUsername`, {
    method: "PUT",
  })
  .then(response => response.json())
}

export default {
  register, login, logout, profile, updateUserName, checkIfAdmin, makeAdmin
}