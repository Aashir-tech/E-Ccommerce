import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../redux/slice/product.js";
import Loader from "../layout/Loader/loader.js";
import ProductCard from "../Home/ProductCard.js";
import { useParams } from "react-router-dom";
import "./Products.css";
import Pagination from "react-js-pagination";
import ScrollToTop from "../ExtraFeatures/ScrollToTop.js";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";

const categories = [
  "Mobile",
  "Laptop",
  "Footwear",
  "Bottom",
  "T-Shirt",
  "Jeans",
  "Kurta Pajama",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert()


  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 150000]);
  const [category, setCategory] = useState("");
  const [ratings , setRatings] = useState(0)

  const {
    products,
    isLoading,
    isError,
    errorMessage,
    resultPerPage,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const params = useParams();
  const keyword = params.keyword || "";
  // console.log(params.keyword)
  // const {keyword} = params.keyword
  // console.log(params.keyword);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    // console.log(e)
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  // console.log(`Current Page : ${currentPage}`)
  // console.log(`Keyword : ${keyword}`)

  // console.log(filteredProductsCount)

  useEffect(() => {
    if(isError) {
      alert.error(errorMessage)
      dispatch(clearError())
    }

    dispatch(getProduct({ keyword, currentPage, price, category , ratings}));
  }, [dispatch, keyword, currentPage, price, category , ratings ,isError , errorMessage , alert ]);
  // console.log(productsCount)

  let count = filteredProductsCount;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <MetaData title={"PRODUCTS -- ESTORE"}/>
          <ScrollToTop />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price ₹{price[0]}-₹{price[1]}</Typography>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={50000}
              size="small"
              color="primary"
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => {
                    setCategory(category);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                aria-label="Volume"
                value={ratings}
                onChange={(e , newRating) => {
                  setRatings(newRating)
                }}
                min={0}
                max={5}
                size="small"
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"1st"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
