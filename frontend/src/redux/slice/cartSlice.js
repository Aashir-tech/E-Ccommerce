import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;


// Add TO cart
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, { dispatch, getState }) => {
    const { data } = await axios.get(`${baseUrl}/api/v1/product/${id}` , { withCredentials: true});

    dispatch(
      addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      })
    );

    // console.log("Dispatched successfully " , data)

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  }
);

// Remove Item from cart
export const removeCartItems = createAsyncThunk(
  "cart/removeCartItem",
  async ({ id }, { getState, dispatch }) => {
    dispatch(removeCart(id));

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  }
);

export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  async (data , { dispatch}) => {
    dispatch(shippingInfo(data));

    localStorage.setItem("shippingInfo" , JSON.stringify(data))
  }
);

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
    },

    removeCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
    },
    shippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
  },
});

export const { addToCart, removeCart, shippingInfo } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
