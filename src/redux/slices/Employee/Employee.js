import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const authToken = localStorage.getItem("token");

export const employee = createAsyncThunk("employee", async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getEmployeesList`,
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
});
const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: {
    loading: false,
    employeeList: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(employee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(employee.fulfilled, (state, action) => {
      state.loading = false;
      state.employeeList = action.payload;
    });
    builder.addCase(employee.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default employeeSlice.reducer;
