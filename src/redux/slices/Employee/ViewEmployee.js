import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const viewEmployee = createAsyncThunk("viewEmployee", async (id) => {
  console.log(id, "id");
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getParticularEmployee/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response, "redux response");
    return response;
  } catch (error) {
    console.log(error, "redux error");
    throw error;
  }
});

const viewEmployeeSlice = createSlice({
  name: "viewEmployeeSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(viewEmployee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(viewEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(viewEmployee.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default viewEmployeeSlice.reducer;
