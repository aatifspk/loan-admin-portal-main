import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
// it's a mistake in naming it is for filterdata

export const viewBranch = createAsyncThunk("viewBranch", async (id) => {
  console.log(id);
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getBranch/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(id, "id");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const viewBranchSlice = createSlice({
  name: "viewBranchSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(viewBranch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(viewBranch.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(viewBranch.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default viewBranchSlice.reducer;
