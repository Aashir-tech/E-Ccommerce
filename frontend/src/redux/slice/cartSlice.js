import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const addItemsToCart = createAsyncThunk(
    'cart/addItemsToCart', async({id , quantity} , {dispatch , getState}) => {
        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch(addToCart({
            product : data.product._id,
            name : data.product.name,
            price : data.product.price,
            image : data.product.images[0].url,
            stock : data.product.Stock,
            quantity
        }))

        localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
    }
)

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        cartItems : []
    },
    reducers : {
        addToCart : (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.product === item.product);

            if(isItemExist) {
                state.cartItems.map((i) => i.product === isItemExist.product ? item : i)
            } else {
                state.cartItems.push(item)
            }
        } 
    }
})

export const {addToCart} = cartSlice.actions
export const cartReducer =  cartSlice.reducer;

