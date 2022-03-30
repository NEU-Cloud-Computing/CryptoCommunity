const REMOTE_API = "https://still-reaches-25179.herokuapp.com/api";

export const addCoinToUser = (userId, coinName) =>
    fetch(`${REMOTE_API}/coins/${userId}/add/${coinName}`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())


export const removeCoinFromUser = (userId, coinName) =>
    fetch(`${REMOTE_API}/coins/${userId}/remove/${coinName}`, {
      method: "DELETE"
    })
    .then(response => response.json())

export const findCoinsForUser = (uid) =>
    fetch(`${REMOTE_API}/coins/${uid}`)
    .then(response => response.json())

export const findUsersForCoin = (coinName) =>
    fetch(`${REMOTE_API}/users/${coinName}`)
    .then(response => response.json())


export default {
  findCoinsForUser,
  findUsersForCoin,
  removeCoinFromUser,
  addCoinToUser
};