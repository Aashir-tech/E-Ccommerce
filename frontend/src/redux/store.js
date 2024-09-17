// import {createStore , combineReducers , applyMiddleware} from "redux"
// import {thunk} from "redux-thunk"
// import {composeWithDevTools} from "redux-devtools-extension"

// const reducer = combineReducers({});

// let initialState = {};

// const middleware = [thunk];

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// )

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { productsReducer, productDetailsReducer, newReviewReducer } from "./slice/productSlice";
import {
  forgotPasswordReducer,
  updateProfileReducer,
  userReducer,
} from "./slice/userSlice";
import { cartReducer } from "./slice/cartSlice";
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./slice/orderSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview : newReviewReducer
  },
});
