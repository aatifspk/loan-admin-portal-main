import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const authToken = localStorage.getItem("token");
export const addProduct = createAsyncThunk(
  "addProduct",
  async (productData) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/createproduct`,
        { productData },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response, "redux response");
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error, "redux error");
      throw error;
    }
  }
);

const addProductSlice = createSlice({
  name: "addProductSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(addProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log(action.payload);
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isError = true;
      console.log(action);
    });
  },
});

export default addProductSlice.reducer;
