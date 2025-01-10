import { createSlice } from "@reduxjs/toolkit";

type UserInfo = {
  username: string;
}

const userStore = createSlice({
  name: "user",
  initialState:{
    userInfo: {} as UserInfo,
  },
  reducers:{
    setUserInfo(state, action) {
      state.userInfo.username = action.payload;
    }
  }
})

const { setUserInfo } = userStore.actions;

const userReducer = userStore.reducer;

export { setUserInfo }
export default userReducer;

