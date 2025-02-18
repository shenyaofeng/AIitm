import { Mask, SpinLoading } from 'antd-mobile'
// 加载中动画蒙层组件
export const LoadingOverlay = () => {
  return (
    <div className = "overlay">
      <Mask >
        <div className="loading">
          <SpinLoading color='primary' style={{ '--size': '48px' }} />
          <div>
            加载中...
          </div>
        </div>
      </Mask>
    </div>
  );
}