import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams} from "react-router-dom";
import movieService from "../services/coin-exchange-service"
import "../index.css";
import "../styles/details-page.css"
import NavBar from "./navbar";
import coinService from "../services/coin-service";
import userService from "../services/user-service";

const DetailsScreen = () => {
  const date = new Date;
  const [currentUser, setCurrentUser] = useState({username: '', password: ''})
  const {coinId, currencyId} = useParams();
  const history = useHistory();
  const isCrypto = "";
  const [results, setResults] = useState({searchResults: []})
  const [compareResults, setCompareResults] = useState({compareSearchResults: []})
  const [usersForCoin, setUsersForCoin] = useState([]);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    userService.profile()
    .then((currentUser) => {
      setCurrentUser(currentUser)
      findExchanceData()
    })
  }, [needsUpdate])

  const findExchanceData = () => {
    movieService.findDetailedCoinData(coinId)
    .then((Results) => {
      setResults(Results[0]);
    }, [])
    coinService.findUsersForCoin(coinId)
    .then((coins) => {
      setUsersForCoin(coins)
    })
  }

  const addCoinToUser = () => {
    coinService.addCoinToUser(currentUser.username, results.asset_id).then((result) => {
      setNeedsUpdate(true);
    })
    setNeedsUpdate(false);
  }

  const isCryptoText = (cryptoKey) => {
    if(cryptoKey === 1){
      return " Crypto";
    } else {
      return " Traditional";
    }
  }

  return(
      <div>
        <div>
         <NavBar/>
          </div>
          <div className="details-welcome">
            <h1>Detailed Currency Page</h1>
            <h6>The information on this page is current as of {date.toDateString()} {date.toTimeString()}</h6>
          </div>
        <div class="tool-tip nav-buttons">
          <i className="fas fa-2x fa-arrow-circle-left" onClick={()=>{history.goBack()}}></i>
          <span class="tool-tip-text">Go Back</span>
        </div>
        <div className="tool-tip float-right nav-button">
          <i value="Add to My Coins" className="fas fa-2x fa-check float-right"
             onClick={() => {
               addCoinToUser()
             }}></i>
          <span className="tool-tip-text">Add To My Coins</span>
        </div>
        <br/>
        <ul className="list-group">
          <li className="list-group-item">
            Asset ID: <b>{results.asset_id}</b>
          </li>
          <li className="list-group-item">
            Trading Name: <b>{results.name}</b>
          </li>
          <li className="list-group-item">
            Currency Type:
              <b>
                {isCryptoText(results.type_is_crypto)}
              </b>
          </li>
          <li className="list-group-item">
            Introduced On: <b>{results.data_start}</b>
          </li>
          <li className="list-group-item">
            Last Active On: <b>{results.data_end}</b>
          </li>
          <li className="list-group-item">
            1 Day Volume (USD): <b>{results.volume_1day_usd}</b>
          </li>
        </ul>
        <br/>
        <div className="users-who-own-coin">
          <h3 className="section-heading">Users Who Own This Coin</h3>
            {
              usersForCoin.map((user) => {
                return(
                    <li className="list-group-item-post">
                      <Link to={`/profile/${user.userId}`} className="section-heading">{user.userId}</Link>
                    </li>
                )
              })
            }
        </div>
        <div className="footer">
          <a href="https://www.privacypolicies.com/live/a9ccc0fc-fdec-4404-a260-4f009950b239">Privacy Policy</a>
          <p>Vincent Luo & Richard A. Castaneda <br/>
            Northeastern University CS5610</p>
        </div>
      </div>
  )
}

export default DetailsScreen;