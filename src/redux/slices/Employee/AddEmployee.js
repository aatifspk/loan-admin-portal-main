import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const authToken = localStorage.getItem("token");
export const addEmployee = createAsyncThunk(
  "addEmployee",
  async (EmployeeData) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/createEmployee`,
        EmployeeData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response, "redux response");
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error, "redux error");
      throw error;
    }
  }
);

const addEmployeeSlice = createSlice({
  name: "addEmployeeSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(addEmployee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default addEmployeeSlice.reducer;
