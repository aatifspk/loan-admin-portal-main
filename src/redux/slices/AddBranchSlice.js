import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const authToken = localStorage.getItem("token");
export const addBranch = createAsyncThunk(
  "addBranch",
  async (branchData, id) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/createBranch`,
        branchData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

const addBranchSlice = createSlice({
  name: "addBranchSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(addBranch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addBranch.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      console.log(action.payload);
    });
    builder.addCase(addBranch.rejected, (state, action) => {
      state.isError = true;
      console.log(state.isError);
    });
  },
});

export default addBranchSlice.reducer;
