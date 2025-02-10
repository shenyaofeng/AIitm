import { createSlice } from "@reduxjs/toolkit";

const barstatusStore = createSlice({
  name: "bar",
  initialState: {
    barstatus: false,
  },
  reducers: {
    setbarstatus(state, action) {
      state.barstatus = action.payload;
    },
  },
});

const { setbarstatus } = barstatusStore.actions;

const barReducer = barstatusStore.reducer;

export { setbarstatus };
export default barReducer;