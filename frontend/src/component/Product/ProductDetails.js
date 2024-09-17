import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";

import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../redux/slice/product.js";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/loader.js";
import { useAlert } from "react-alert";
import { clearError } from "../../redux/slice/product.js";
import MetaData from "../layout/MetaData.js";
import { addItemsToCart } from "../../redux/slice/cartSlice.js";

const ProductDetails = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { product, isLoading, isError, errorMessage } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (isError) {
      alert.error(errorMessage);
      dispatch(clearError());
    }
    dispatch(getProductDetails(params.id));
    // console.log(action)
  }, [dispatch, params.id, isError, errorMessage, alert]);

  // console.log(product.images)

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 15 : 20,
    activeColor: "tomato",
    value: product?.ratings,
    isHalf: true,
  };

  const [quantity , setQuantity] = useState(1)

  const increaseQuantity = () => {
    if(product.Stock <= quantity) return;
    const qty = quantity + 1
    setQuantity(qty)
  }

  const decreaseQuantity = () => {
    if(quantity <= 1) return 
    const qty = quantity - 1
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart({id : params.id , quantity : quantity}))
    alert.success("Items Added to Cart Successfully")
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- ESTORE`} />
          <div className="productDetails">
            <div className="carousel-container">
              <Carousel className="image">
                {product.images &&
                  product.images.map((item, i) => (
                    <div className="imageBox">
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>

            <div className="details-container">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>{product.numOfReviews} Reviews</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                </div>

                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
