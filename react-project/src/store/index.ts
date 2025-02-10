import { configureStore } from "@reduxjs/toolkit";
//导入子模块reducer
import textReducer from "./modules/sendStore.ts";
import userReducer from "./modules/userStore.ts";
import barReducer from "./modules/tabBarStore.ts";
//创建store
const store = configureStore({
  reducer: {
    content: textReducer,
    user: userReducer,
    bar: barReducer,
  },
});
//导出store
export type RootState = ReturnType<typeof store.getState>;
// 定义 AppDispatch 类型
export type AppDispatch = typeof store.dispatch;
export default store;
