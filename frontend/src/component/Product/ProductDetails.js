import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import ReviewCard from "./ReviewCard.js";

import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetails,
  newReview,
  reviewReset,
} from "../../redux/slice/productSlice.js";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/loader.js";
import { useAlert } from "react-alert";
import { clearError } from "../../redux/slice/productSlice.js";
import MetaData from "../layout/MetaData.js";
import { addItemsToCart } from "../../redux/slice/cartSlice.js";

import {
  DialogContent,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  Rating,
} from "@mui/material";

const ProductDetails = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { product, isLoading, isError, errorMessage } = useSelector(
    (state) => state.productDetails
  );

  const {
    success,
    isError: isReviewError,
    errorMessage: reviewErrorMessage,
  } = useSelector((state) => state.newReview);

  // console.log(product.images)

  const options = {
    size: "large",
    value: product?.ratings,
    readOnly: true,
    precision: 0.5
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart({ id: params.id, quantity: quantity }));
    alert.success("Items Added to Cart Successfully");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (isError) {
      alert.error(errorMessage);
      dispatch(clearError());
    }

    if (isReviewError) {
      alert.error(reviewErrorMessage);
      dispatch(clearError());
    }

    if(success) {
      alert.success("Review Submitted Successfully")

      dispatch(reviewReset());
    }

    dispatch(getProductDetails(params.id));
    // console.log(action)
  }, [dispatch, params.id, isError, errorMessage, alert , success , isReviewError , reviewErrorMessage ]);

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
                <Rating {...options} />
                <span className="detailsBlock-2-span">{product.numOfReviews} Reviews</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
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

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle className="submitDialogTitle">
              Submit Review
            </DialogTitle>
            <DialogContent className="submitDialog">
              <div className="submitDialogContent">
                <p className="submitDialogContentHeading">Rate it: </p>
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
              </div>

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

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
