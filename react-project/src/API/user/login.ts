import httpInstance from "../../utils/http";
// 登录
type ReqData = {
  username: string;
  password: string;
};
export const loginAPI = (data: ReqData) => {
  return httpInstance({
    url: "/user/login",
    method: "POST",
    data,
  });
};
