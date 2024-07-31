import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart , removeCartItems} from "../../redux/slice/cartSlice.js";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData.js";

// const item = {
//   product: "Product1",
//   name: "Aashir",
//   price: 200,
//   image: "https://www.gstatic.com/webp/gallery/4.webp",
//   quantity: 5,
// };

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate()
  // console.log(cartItems);

  const increaseQuantity = (id, quantity, stock) => {
    // console.log("inside increase quantity");
    const newQuantity = quantity + 1;
    // console.log("new quantity", newQuantity);
    if (quantity >= stock) {
      return;
    }
    dispatch(addItemsToCart({ id, quantity: newQuantity }));
    // console.log("Added Successfully");
  };

  const decreaseQuantity = (id , quantity) => {
    const newQuantity = quantity - 1
    if( quantity <= 1) {
      return 
    }

    dispatch(addItemsToCart({id , quantity : newQuantity}))
  }

  const deleteCartItems = (id) => {
    dispatch(removeCartItems({id}))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <>
    <MetaData title="Cart" />
    {cartItems.length === 0 ? (
      <div className="emptyCart">
        <RemoveShoppingCartIcon />
        <Typography>No Product in your Cart</Typography>
        <Link to="/products">View Products</Link>
      </div>
    
    ) : (
      <>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p className="quantity">Quantity</p>
          <p>SubTotal</p>
        </div>

        {cartItems &&
          cartItems.map((item) => (
            <div className="cartContainer" key={item.product}>
              <div className="gridRow">
                <CartItemCard item={item} deleteCartItems = {deleteCartItems}/>
              </div>

              <div className="cartInput">
                <button onClick={() => {
                  decreaseQuantity(item.product , item.quantity)
                }}>-</button>
                <input type="number" readOnly value={item.quantity} />
                <button
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)
                  }
                >
                  +
                </button>
              </div>
              <p className="cartSubTotal">{`₹${item.price * item.quantity}`}</p>
            </div>
          ))}

        <div className="cartGrossTotal">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{`₹${cartItems.reduce((acc , item) => acc + item.quantity * item.price, 0)}`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkoutHandler}>Checkout</button>
          </div>
        </div>
      </div>
    </>
    )}
    </>
  );
};

export default Cart;
