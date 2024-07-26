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
      console.log("REsponse : ", response);
      return response?.data?.user;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      // console.log("USER DATA",userData)

      const response = await axios.put("/api/v1/me/update", userData, config);
      // console.log("RESPONSE : " , response)

      return response?.data?.success;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (password, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const response = await axios.put(
        "/api/v1/password/update",
        password,
        config
      );

      return response?.data?.success;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const response = await axios.post(
        "/api/v1/password/forgot",
        email,
        config
      );
      console.log("Data", response);

      return response?.data?.message;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({token , passwords}, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const response = await axios.put(
        `/api/v1/password/reset/${token}` ,
        passwords,
        config
      );
      console.log("Data", response);

      return response?.data?.success;
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
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload?.message || "Failed to fetch User";
    });
  },
});

const updateSlice = createSlice({
  name: "updateProfile",
  initialState: {},
  reducers: {
    removeError: (state) => {
      state.errorMessage = null;
    },
    reset: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    // Update Profile thunks
    builder.addCase(updateProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isUpdated = action.payload;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload?.message || "Failed to fetch User";
    });

    // Update Password thunks
    builder.addCase(updatePassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isUpdated = action.payload;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload?.message || "Failed to fetch User";
    });
  },
});


const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {},
  reducers: {
    removeError: (state) => {
      state.errorMessage = null;
    }
  },
  extraReducers: (builder) => {
    
    // Update Password thunks
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.isLoading = true;
      state.errorMessage = null

    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload?.message || "Failed to fetch User";
    });


    // Reset Password thunks
    builder.addCase(resetPassword.pending, (state, action) => {
      state.isLoading = true;
      state.errorMessage = null

    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload?.message || "Failed to fetch User";
    });
  },
});

export const { clearError } = userSlice.actions;
export const { removeError, reset } = updateSlice.actions;
export const userReducer = userSlice.reducer;
export const updateProfileReducer = updateSlice.reducer;
export const forgotPasswordReducer = forgotPasswordSlice.reducer;
