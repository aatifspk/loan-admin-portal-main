import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const filterEmployee = createAsyncThunk(
  "filterEmployee",
  async (keyWord) => {
    console.log(keyWord);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getEmployeesList?keyword=${keyWord}`,
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

const filterEmployeeSlice = createSlice({
  name: "filterEmployeeSlice",
  initialState: {
    loading: false,
    employees: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(filterEmployee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(filterEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    });
    builder.addCase(filterEmployee.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default filterEmployeeSlice.reducer;
