import { createSlice } from "@reduxjs/toolkit";
import { setToken,getToken } from "../../utils";


type UserInfo = {
  username: string ;
}

const userStore = createSlice({
  name: "user",
  initialState: {
    userInfo: { username: getToken() || "" } as UserInfo,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload.username;
      setToken(action.payload.username);
    },
  },
});

const { setUserInfo } = userStore.actions;

const userReducer = userStore.reducer;

export { setUserInfo }
export default userReducer;

