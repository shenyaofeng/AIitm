import { configureStore } from "@reduxjs/toolkit";
//导入子模块reducer
import textReducer from "./modules/sendStore.ts";
import userReducer from "./modules/userStore.ts";
//创建store
const store = configureStore({
  reducer: {
    content: textReducer,
    user: userReducer,
  },
});
//导出store
export default store;
