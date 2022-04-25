const key = "67FFC13C-2434-4FE5-886F-9F3C2F3D967F"

const findExchangeRateByCoin = (coinCode) => {
  return fetch(`https://rest.coinapi.io/v1/exchangerate/${coinCode}?apikey=${key}`)
  .then(response => response.json())
}

const findDetailedExchangeData = (coinCode, currencyCode) => {
  return fetch(`https://rest.coinapi.io/v1/exchangerate/${coinCode}/${currencyCode}?apikey=${key}`)
    .then(response => response.json())
}

const getAllExchanges = () => {
  return fetch(`https://rest.coinapi.io/v1/exchanges?apikey=${key}`)
  .then(response => response.json())
}

const findDetailedCoinData = (coinCode) => {
  return fetch(`https://rest.coinapi.io/v1/assets/${coinCode}/?apikey=${key}`)
  .then(response => response.json())
}

export default {
  findExchangeRateByCoin,
  findDetailedExchangeData,
  getAllExchanges,
  findDetailedCoinData
}

