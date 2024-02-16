import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const authToken = localStorage.getItem("token");
export const addAgent = createAsyncThunk("addAgent", async (agentData) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/admin/createAgent`,
      agentData,
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

const addAgentSlice = createSlice({
  name: "addAgentSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(addAgent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addAgent.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addAgent.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default addAgentSlice.reducer;
