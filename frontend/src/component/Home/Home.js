import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard.js";
import Loader from "../layout/Loader/loader.js";
import "./Home.css";
import MetaData from "../layout/MetaData.js";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProduct } from "../../redux/slice/productSlice.js";
import { useAlert } from "react-alert";
// import Header from "../layout/Header/Header.js";
import { Link } from "react-scroll";

// const product = {
//   name: "Red T-Shirt",
//   images: [
//     {
//       url: "https://assets.ajio.com/medias/sys_master/root/20231205/yrPw/656ed44cafa4cf41f5b4f40a/-473Wx593H-462103975-red-MODEL.jpg",
//     },
//   ],
//   price: "₹10000",
//   _id: "aashir",
// };

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, isLoading, isError, errorMessage } = useSelector(
    (state) => state.products
  );
  // console.log("Products :", products);
  // console.log(isError);
  // console.log(error);

  useEffect(() => {
    if (isError) {
      alert.error(errorMessage);
      dispatch(clearError());
    }

    dispatch(getProduct());
  }, [dispatch, isError, alert, errorMessage]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Estore</p>
            <h1>YOU CAN FIND PRODUCTS BELOW </h1>
            <Link
              to="container"
              spy={true}
              smooth={true}
              offset={-150}
              duration={500}
            >
              <button>Scroll {<CgMouse />}</button>
            </Link>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
