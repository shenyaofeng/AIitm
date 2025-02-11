import httpInstance from "../../utils/http";
import { UserType } from "./userType";
// 注册
type ReqData = {
    username: string;
    password: string;
}
type ResData = {
    data: string;
    username: string;
}
type Reqinfo = {
    data: string;
}
export const registerAPI = (data: ReqData) => {
  return httpInstance<UserType<ResData>>({
    url: "/user/register",
    method: "POST",
    data,
  });
};

export const sendAPI = (data: Reqinfo) => {
  return httpInstance<UserType<ResData>>({
    url: "/send",
    method: "POST",
    data,
  });
};