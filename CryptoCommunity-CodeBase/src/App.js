import logo from './logo.svg';
import './App.css';
import SearchScreen from "./components/search-screen";
import DetailsScreen from "./components/details-screen";
import HomeScreen from "./components/home-screen";
import {BrowserRouter, Route} from "react-router-dom";
import ExchangeRateScreen from "./components/exchange-rates-screen";
import Login from "./components/users/login";
import Register from "./components/users/register";
import Profile from "./components/users/profile";
import ForumScreen from "./components/forum-screen/forum-home"
import ForumPost from "./components/forum-screen/forum-post";
import UserProfile from "./components/users/user-profile-public"

function App() {
  return (
      <div className="container-fluid">
        <BrowserRouter>
          <Route path="/" exact={true}>
            <HomeScreen/>
          </Route>
          <Route path="/login" exact={true}>
            <Login/>
          </Route>
          <Route path="/register" exact={true}>
            <Register/>
          </Route>
          <Route path="/profile" exact={true}>
            <Profile/>
          </Route>
          <Route path={["/search", "/search/:title"]} exact={true}>
            <SearchScreen/>
          </Route>
          <Route path={["/details/:coinId", "/details/:coinId/:currencyId"]} exact={true}>
            <DetailsScreen/>
          </Route>
          <Route path="/exchangerate/:coinId/:currencyId" exact={true}>
            <ExchangeRateScreen/>
          </Route>
          <Route path="/forum" exact={true}>
            <ForumScreen/>
          </Route>
          <Route path="/forum/post/:postId" exact={true}>
            <ForumPost/>
          </Route>
          <Route path="/profile/:username" exact={true}>
            <UserProfile/>
          </Route>
        </BrowserRouter>
      </div>
  );
}

export default App;
