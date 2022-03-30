import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams} from "react-router-dom";
import movieService from "../services/coin-exchange-service"
import NavBar from "../components/navbar"
import "../index.css";
import "../styles/details-page.css"

const ExchangeRateScreen = () => {
  const date = new Date;
  const {coinId, currencyId} = useParams();
  const history = useHistory();
  const isCrypto = "";
  useEffect(() => {
    findExchanceData()
  }, [coinId, currencyId])
  const [results, setResults] = useState({searchResults: []})
  const [compareResults, setCompareResults] = useState({compareSearchResults: []})

  const findExchanceData = () => {
    movieService.findDetailedExchangeData(coinId, currencyId)
    .then((Results) => {
      setResults(Results);
    }, [])
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
       <NavBar/>
        <div className="details-welcome">
          <h1>Current Exchange Rates Page</h1>
          <h6>Here are the detailed exchange rates of the currencies you requested</h6>
        </div>
        <div className="tool-tip nav-buttons">
          <i className="fas fa-2x fa-arrow-circle-left" onClick={() => {
            history.goBack()
          }}></i>
          <span className="tool-tip-text">Go Back</span>
        </div>
        <br/>
        <ul className="list-group">
          <li className="list-group-item">
            Currency A: <b>{results.asset_id_base}</b>
          </li>
          <li className="list-group-item">
            Currency B: <b>{results.asset_id_quote}</b>
          </li>
          <li className="list-group-item">
            Current Exchange Rate: 1 {results.asset_id_base} is currenlty worth <b>{results.rate}</b> {results.asset_id_quote}s
          </li>
          <li className="list-group-item">
            Valid On: <b>{results.time}</b>
          </li>
        </ul>
        <br/>
        <div className="footer">
          <a href="https://www.privacypolicies.com/live/a9ccc0fc-fdec-4404-a260-4f009950b239">Privacy Policy</a>
          <p>Vincent Luo & Richard A. Castaneda <br/>
            Northeastern University CS5610</p>
        </div>
      </div>

  )
}

export default ExchangeRateScreen;