// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const authToken = localStorage.getItem("token");

// export const PermanentDeleteAgent = createAsyncThunk(
//   "PermanentDeleteAgent",
//   async (id) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:8080/api/admin/permanentDeleteAgent/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// const permanentDeleteAgentSlice = createSlice({
//   name: "permanentDeleteAgentSlice",
//   initialState: {
//     loading: false,
//     data: null,
//     isError: false,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(PermanentDeleteAgent.pending, (state, action) => {
//       state.loading = true;
//     });
//     builder.addCase(PermanentDeleteAgent.fulfilled, (state, action) => {
//       state.loading = true;
//       state.data = action.payload;
//     });
//     builder.addCase(PermanentDeleteAgent.rejected, (state, action) => {
//       state.isError = true;
//     });
//   },
// });

// export default permanentDeleteAgentSlice.reducer;
