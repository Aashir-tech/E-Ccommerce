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
import { CgFontSpacing } from "react-icons/cg";

const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    products,
    isLoading,
    isError,
    errorMessage,
    resultPerPage,
    productsCount,
  } = useSelector((state) => state.products);

  const params = useParams();
  const keyword = params.keyword || ""
  // console.log(params.keyword)
  // const {keyword} = params.keyword
  // console.log(params.keyword);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    // console.log(e)
  };

  // console.log(`Current Page : ${currentPage}`)
  // console.log(`Keyword : ${keyword}`)

  useEffect(() => {
    dispatch(getProduct({keyword , currentPage}));
  }, [dispatch, keyword ,currentPage]);
  // console.log(productsCount)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <ScrollToTop />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          {resultPerPage < productsCount && (
            
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
