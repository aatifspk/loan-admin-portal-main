import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const restoreEmployee = createAsyncThunk(
  "restoreEmployee",
  async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/admin/employeeRestore/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const restoreEmployeeSlice = createSlice({
  name: "restoreEmployeeSlice",
  initialState: {
    loading: false,
    restoreEmployeedata: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(restoreEmployee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(restoreEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.restoreEmployeedata = action.payload;
    });
    builder.addCase(restoreEmployee.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default restoreEmployeeSlice.reducer;
