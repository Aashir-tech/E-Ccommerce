import { createAsyncThunk , createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
    "createOrder",
    async (order) => {
        try {
            const config = {
                headers : {
                    "Content-Type" : "application/json"
                }
            }

            const {data} = await axios.post("/api/v1/order/new", order , config);
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
        isError: false,
        errorMessage: "",
    },
    reducers: {
        removeError: (state) => {
          state.errorMessage = null;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(createOrder.pending , (state,action) => {
            state.isLoading = true
        });

        builder.addCase(createOrder.fulfilled , (state, action) => {
            state.isLoading = false;
            state.order = action.payload;
        });

        builder.addCase(createOrder.rejected , (state, action) => {
            state.isError = true;
            state.isLoading = true;
            state.errorMessage = action.payload;
        });
    }
    
})

export const {removeError} = orderSlice.actions;
export const newOrderReducer = orderSlice.reducer;