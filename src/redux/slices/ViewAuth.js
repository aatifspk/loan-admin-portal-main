import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const id = localStorage.getItem("id");
const authToken = localStorage.getItem("token");

console.log(id, "id");
export const viewUser = createAsyncThunk("viewUser", async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getAdminProfile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const viewUserSlice = createSlice({
  name: "viewUserSlice",
  initialState: {
    loading: false,
    data: null,
    profileCreated: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(viewUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(viewUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.data
        ? (state.profileCreated = true)
        : (state.profileCreated = false);
      // state.profileCreated = true;
      // console.log(action.payload, "data");
      //got this
    });
    builder.addCase(viewUser.rejected, (state, action) => {
      state.isError = true;
      console.log(action, "action");
      console.log(state.profileCreated, "profile created");
      state.profileCreated = false;
    });
  },
});

export default viewUserSlice.reducer;
