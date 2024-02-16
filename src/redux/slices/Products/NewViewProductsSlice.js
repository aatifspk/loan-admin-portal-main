import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";



export const authSlice = createSlice({
  name: "newViewProduct",
  initialState: {
    product: null,
    productFound: false
  },
  reducers: {
    setNewProduct: (state, action) => {
      state.product = action.payload;
      state.productFound = true;
    },
    logOut: (state, action) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
