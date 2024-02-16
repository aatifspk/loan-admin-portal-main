import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const getSoftDeleteEmployeesList = createAsyncThunk(
  "getSoftDeleteEmployeesList",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getSoftDeleteEmployeesList`,
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

const getSoftDeleteEmployeesListSlice = createSlice({
  name: "getSoftDeleteEmployeesListSlice",
  initialState: {
    loading: false,
    deletedEmployeeList: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getSoftDeleteEmployeesList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSoftDeleteEmployeesList.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedEmployeeList = action.payload;
    });
    builder.addCase(getSoftDeleteEmployeesList.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default getSoftDeleteEmployeesListSlice.reducer;
