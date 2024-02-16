import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const clientPagination = createAsyncThunk(
  "clientPagination",
  async ({ page, keyWord, perPage }) => {
    console.log(page, "page");
    console.log(keyWord, "keyWord");
    console.log(perPage, "perPage");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getClinetsList?keyWord=${keyWord}&page=${page}&perPage=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);
const clientPaginationSlice = createSlice({
  name: "clientPaginationSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(clientPagination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clientPagination.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(clientPagination.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default clientPaginationSlice.reducer;
