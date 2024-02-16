import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const verifyAuth = createAsyncThunk(
  "verifyAuth",
  async ({ email, otp }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/signInByOtp",
        {
          email,
          otp,
        }
      );
      return response;
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

const AuthSlice = createSlice({
  name: "authSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  reducers: {
    logout: (state) => {
      return {
        loading: false,
        data: null,
        isError: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyAuth.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("authSlice data", action.payload);
    });
    builder.addCase(verifyAuth.rejected, (state, action) => {
      state.isError = true;
      state.isError = action.error.message;
    });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
