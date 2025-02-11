import httpInstance from "../../utils/http";
type ReqData = {
  prompt: string;
};
import { UserType } from "../user/userType";
type ResData = {
  url: string;
  prompt: string;
};
export const CreateImagesAPI = (data: ReqData) => {
  return httpInstance<UserType<ResData>>({
    url: "/aiimages",
    method: "POST",
    data,
  });
};