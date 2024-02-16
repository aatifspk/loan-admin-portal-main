import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const authToken = localStorage.getItem("token");
export const addClient = createAsyncThunk("addClient", async (clientData) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/admin/createClient`,
      clientData,
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
});

const addClientSlice = createSlice({
  name: "addClientSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(addClient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addClient.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addClient.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default addClientSlice.reducer;
