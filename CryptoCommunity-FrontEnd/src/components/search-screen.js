import React, {useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import movieService from "../services/coin-exchange-service"
import "../index.css";
import "../styles/search-page.css";
import NavBar from "./navbar";

const SearchScreen = (
    // {
    //     searchTerm={title: "Enter AssetID"}
    // }
) => {
  const {title, currencyId} = useParams();
  const [results, setResults] = useState({rates: []})
  const [searchTitle, setSearchTitle] = useState(title)
  const [cachedItem, setCachedItem] = useState({})
  useEffect( () => {
    findPriceByCoin()
  },[searchTitle])
  const findPriceByCoin = () => {
    movieService.findExchangeRateByCoin(title)
    .then((results) => {
      setResults(results)
    })
  }

  return(
      <div>
        <NavBar/>
        <div className="search-welcome">
          <h1>Welcome to the CryptoCommunity Search Function</h1>
          <h6>Use the Search bar to search for currency data or exchange rates <br/>
          CryptoCommunity utilizes the ISO 4219 naming standard for currency lookup</h6>
        </div>
        <input
            onChange={(e) => setCachedItem({
              title: e.target.value
            })}
            placeholder={cachedItem.title}
            className="form-control"/>
            <nav className="navbar navbar-dark bg-dark">
            <Link
              onClick={() => (setSearchTitle(cachedItem.title))}
              className="btn btn-primary"
              to={`/search/${cachedItem.title}`}>
              Current Exchange Rates
            </Link>
            <Link
                onClick={() => (setSearchTitle(cachedItem.title))}
                className="btn btn-primary"
                to={`/details/${cachedItem.title}`}>
              Currency Details
            </Link>
            </nav>
        <ul className="list-group">
          {
            results.rates.map((coinRate) =>{
              return(
                <li className="list-group-item">
                  <Link className="search-results" to={`/exchangerate/${title}/${coinRate.asset_id_quote}`}>
                    1 {results.asset_id_base} is Worth: {coinRate.rate} {coinRate.asset_id_quote}
                  </Link>
                </li>
              )
            })
          }
        </ul>
        <div className="footer">
          <a href="https://www.privacypolicies.com/live/a9ccc0fc-fdec-4404-a260-4f009950b239">Privacy Policy</a>
          <p> <br/>
            Northeastern University CS5610</p>
        </div>
      </div>
  )
}

export default SearchScreen;