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

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Open Sans", "Poppins"],
      },
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/product/:id" Component={ProductDetails} />
        <Route path="/products/" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />

        <Route path="/search" Component={Search} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
