import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const clearError = createAction("CLEAR_ERROR");

export const login = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    // const {loginEmail , loginPassword} = credentials
    // console.log("Login Email in thunk", email);
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const response = await axios.post(
        "/api/v1/login",
        { email, password },
        config
      );
      console.log("Data", response);

      return response?.data?.user;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (userData, { rejectWithValue }) => {
    // console.log(userData)

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const response = await axios.post("/api/v1/register", userData, config);
      // console.log("Data", response);

      return response?.data?.user;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

export const loadUser = createAsyncThunk(
  "loadUser",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axios.get("/api/v1/me");
      console.log("Data", response);

      return response?.data?.user;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

// log Out User
export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axios.get("/api/v1/logout");
      console.log("REsponse : " , response)
      return response?.data?.user

    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState: {
    isLoading: false,
    user: {},
    isAuthenticated: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearError: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload?.message || "Failed to fetch User";
      state.user = null;
    });

    // Register thunks
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload?.message || "Failed to fetch User";
      state.user = null;
    });

    // loadUser thunks
    builder.addCase(loadUser.pending, (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload?.message || "Failed to fetch User";
      state.user = null;
    });

    // Logout User thunks
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false ;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload?.message || "Failed to fetch User";
    });
  },
});

export const { clearError } = userSlice.actions;
export const userReducer = userSlice.reducer;
