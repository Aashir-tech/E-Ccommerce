import { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";
// import loader from './component/layout/Loader/loader.js';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import ScrollToTop from "./component/ExtraFeatures/ScrollToTop";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import { store } from "./redux/store.js";
import { loadUser } from "./redux/slice/user.js";
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js"

function App() {
  const {isAuthenticated , user} = useSelector((state) => state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Open Sans", "Poppins"],
      },
    });

    store.dispatch(loadUser())

  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
      

        <Route path="/" Component={Home} />
        <Route path="/product/:id" Component={ProductDetails} />
        <Route path="/products/" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />

        <Route path="/search" Component={Search} />
        <Route path="/account" Component={Profile} />
        <Route path="/login" Component={LoginSignUp} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
