import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";



export const loanFormSlice = createSlice({
  name: "loanForm",
  initialState: {
    data: null,
    isLoanForm: false
  },
  reducers: {
    setLoanForm: (state, action) => {
      state.data = action.payload;
      state.isLoanForm = true;
    },
    removeLoanForm: (state, action) => {
      state.data = null;
      state.isLoanForm = false;
    },
  },
});

export const { setLoanForm, removeLoanForm } = loanFormSlice.actions;
export default loanFormSlice.reducer;
