// 封装高阶组件
// 有token正常跳转，无token去登陆
import { getToken } from "../utils/user";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactNode;
}

export function AuthRoute({ children }: AuthRouteProps) {
  const token = getToken();

  if (token) {
    return <>{children}</>;
  } else {
    // 使用 Navigate 组件进行导航
    return <Navigate to="/login" />;
  }
}
