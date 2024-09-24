import { createAction, createAsyncThunk , createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;

export const clearErrors = createAction("CLEAR_ERROR");

export const createOrder = createAsyncThunk(
    "createOrder",
    async (order) => {
        try {
            const config = {
                headers : {
                    "Content-Type" : "application/json"
                },
                withCredentials: true,
            }

            const {data} = await axios.post(`${baseUrl}/api/v1/order/new`, order , config);
            // console.log(data)
            return data;

        } catch (error) {
            return isRejectedWithValue({
                success: false,
                payload: error.response?.data?.message || error.message,
              })
        }
    }
)

const orderSlice = createSlice({
    name : "newOrder",
    initialState : {
        isLoading : true,
        order : {},
        orders : [],
        isError: false,
        errorMessage: "",
    },
    reducers: {
        removeError: (state) => {
          state.errorMessage = null;
        }
    },
    extraReducers : (builder) => {
        // New Orders thunk
        builder.addCase(createOrder.pending , (state,action) => {
            state.isLoading = true
        });

        builder.addCase(createOrder.fulfilled , (state, action) => {
            state.isLoading = false;
            state.order = action.payload;
        });

        builder.addCase(createOrder.rejected , (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

    }
    
});

// My Orders
export const myOrders = createAsyncThunk(
    "myOrders",
    async () => {
        try {
            const {data} = await axios.get(`${baseUrl}/api/v1/orders/me`,{ withCredentials: true},);
            console.log(data)
            return data?.orders;

        } catch (error) {
            return isRejectedWithValue({
                success: false,
                payload: error.response?.data?.message || error.message,
              })
        }
    }
)

const myOrdersSlice = createSlice({
    name : "myOrders",
    initialState : {
        isLoading : true,
        orders : [],
        isError: false,
        errorMessage: "",
    },
    extraReducers : (builder) => {
        // My Orders thunk
        builder.addCase(myOrders.pending , (state,action) => {
            state.isLoading = true
        });

        builder.addCase(myOrders.fulfilled , (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        });

        builder.addCase(myOrders.rejected , (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        builder.addCase(clearErrors , (state , action ) => {
            state.errorMessage = null;
        })
    }
    
})

// Get Order Details
export const getOrderDetails = createAsyncThunk(
    "getOrderDetails",
    async (id) => {
        try {
            const {data} = await axios.get(`${baseUrl}/api/v1/order/${id}` , {withCredentials: true});
            // console.log(data)
            return data?.order;

        } catch (error) {
            return isRejectedWithValue({
                success: false,
                payload: error.response?.data?.message || error.message,
              })
        }
    }
)

const orderDetailsSlice = createSlice({
    name : "orderDetails",
    initialState : {
        isLoading : true,
        order : {},
        isError: false,
        errorMessage: "",
    },
    extraReducers : (builder) => {
        // My Orders thunk
        builder.addCase(getOrderDetails.pending , (state,action) => {
            state.isLoading = true
        });

        builder.addCase(getOrderDetails.fulfilled , (state, action) => {
            state.isLoading = false;
            state.order = action.payload;
        });

        builder.addCase(getOrderDetails.rejected , (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        builder.addCase(clearErrors , (state , action ) => {
            state.errorMessage = null;
        })
    }
    
})

export const {removeError} = orderSlice.actions;

export const newOrderReducer = orderSlice.reducer;
export const myOrdersReducer = myOrdersSlice.reducer;
export const orderDetailsReducer = orderDetailsSlice.reducer;
