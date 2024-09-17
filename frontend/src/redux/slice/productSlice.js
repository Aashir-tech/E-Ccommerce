import { createAction , createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const clearError = createAction("CLEAR_ERROR");

export const getProduct = createAsyncThunk(
  "getProduct",
  async ({keyword = "" , currentPage = 1 , price = [0 , 150000] , category , ratings = 0} = {} , { rejectWithValue }) => { 
    try {
      
  // console.log(`Keyword inside thunk : ${keyword}`)
  // console.log(`currentPage inside thunk : ${currentPage}`)

      // console.log(keyword)
      let link = `/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if(category) {
        link = `/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
      }
      // console.log(link)
      const response = await axios.get(link);
      //   console.log(response.data.products)

      return response?.data;

    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      })
    }
  }
);


const productsSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    products: [],
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      // state.isLoading = true;
      state.isError = true;
      state.errorMessage = action.payload?.message || "Failed to fetch product details"
      // console.log("Error Message : " ,state.errorMessage)
      // console.log("Action Payload : " , action.payload)
      // console.log("Error", action.error.message);
    });
    // builder.addCase(clearError , (state , action) => {
    //   state.isError = false
    //   state.errorMessage = null;
    // })
  },
});

export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/product/${id}`);
      //   console.log(response.data.products)

      return response?.data;
      
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      })
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    isLoading: false,
    product: {},
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload.product;
      state.productCount = action.payload.productCount;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      // state.isLoading = true;
      state.isError = true;
      state.errorMessage = action.payload.message
      // console.log("Error Message : " ,state.errorMessage)
      // console.log("Action Payload : " , action.payload)
      // console.log("Error", action.error.message);
    });
    builder.addCase( clearError , (state , action) => {
      state.errorMessage = null;
    })
  },
});

// NEw Review
export const newReview = createAsyncThunk(
  "newReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = {
        headers : { "Content-type" : "application/json"}
      }

      const response = await axios.put(`/api/v1/review` , reviewData , config);

      return response?.data.success;
      
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      })
    }
  }
);

const newReviewSlice = createSlice({
  name: "productDetails",
  initialState: {
    isLoading: false,
    review: {},
    isError: false,
    errorMessage: "",
  },
  reducers : {
    reviewReset : (state) => {
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(newReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(newReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    });
    builder.addCase(newReview.rejected, (state, action) => {
      // state.isLoading = true;
      state.isError = true;
      state.errorMessage = action.payload
    });
    builder.addCase( clearError , (state , action) => {
      state.errorMessage = null;
    });
    
  },
});

// export default productSlice.reducer;
// export default productDetailsSlice.reducer;


export const {reviewReset} = newReviewSlice.actions;
export const productsReducer = productsSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer
export const newReviewReducer = newReviewSlice.reducer

// 6:17