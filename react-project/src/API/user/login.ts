import httpInstance from "../../utils/http";
import { UserType } from "./userType";
// 登录
type ReqData = {
  username: string;
  password: string;
};
type ResData = {
  data:string;
  token:string;
  username:string;
}
export const loginAPI = (data: ReqData) => {
  return httpInstance<UserType<ResData>>({
    url: "/user/login",
    method: "POST",
    data,
  });
};
