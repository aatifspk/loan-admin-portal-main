import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";



export const loanhSlice = createSlice({
  name: "applicantLoan",
  initialState: {
    data: null,
    isLoanData: false
  },
  reducers: {
    setLoanData: (state, action) => {
      state.data = action.payload;
      state.isLoanData = true;
    },
    removeLoanData: (state, action) => {
      state.data = null;
      state.isLoanData = false;
    },
  },
});

export const { setLoanData, removeLoanData } = loanhSlice.actions;
export default loanhSlice.reducer;
