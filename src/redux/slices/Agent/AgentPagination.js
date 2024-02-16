import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const agentPagination = createAsyncThunk(
  "pagination",
  async ({ page, keyWord, perPage }) => {
    console.log(page, "page");
    console.log(keyWord, "keyWord");
    console.log(perPage, "perPage");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getAgentList?keyWord=${keyWord}&page=${page}&perPage=${perPage}`,
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
const agentPaginationSlice = createSlice({
  name: "agentPaginationSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(agentPagination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(agentPagination.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(agentPagination.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default agentPaginationSlice.reducer;
