import { configureStore } from "@reduxjs/toolkit";
//导入子模块reducer
import textReducer from "./modules/sendStore.ts";
//创建store
const store = configureStore({
  reducer: {
    content: textReducer,
  },
});
//导出store
export default store;
