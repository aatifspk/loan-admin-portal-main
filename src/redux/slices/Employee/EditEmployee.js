import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const editEmployee = createAsyncThunk("editEmployee", async (email) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/admin/createEmployee`,
      email,
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
});

const editEmployeeSlice = createSlice({
  name: "editEmployeeSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(editEmployee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(editEmployee.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default editEmployeeSlice.reducer;
