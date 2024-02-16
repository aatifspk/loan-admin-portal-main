import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const viewProduct = createAsyncThunk("viewProduct", async (id) => {
  console.log(id, "id");
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getParticularProduct/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response, "redux response");
    return response;
  } catch (error) {
    console.log(error, "redux error");
    throw error;
  }
});

const viewProductSlice = createSlice({
  name: "viewProductSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(viewProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(viewProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(viewProduct.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default viewProductSlice.reducer;
