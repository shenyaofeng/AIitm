import { useDispatch } from "react-redux";
import { setbarstatus } from "../store/modules/tabBarStore";
// 封装一个自定义hook tabBar的状态
const useTabBarStatus = () => {
  const dispatch = useDispatch();

  const setVisibleTabBar = () => {
    dispatch(setbarstatus(true));
  };

  const setUnvisibleTabBar = () => {
    dispatch(setbarstatus(false));
  };

  return {
    setVisibleTabBar,
    setUnvisibleTabBar,
  };
}

export default useTabBarStatus;