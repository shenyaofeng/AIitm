import httpInstance from "../../utils/http";
// 注册
type ReqData = {
    username: string;
    password: string;
}
export const registerAPI = (data: ReqData) => {
  return httpInstance({
    url: "/user/register",
    method: "POST",
    data
  });
};