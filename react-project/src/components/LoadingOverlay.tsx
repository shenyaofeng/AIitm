import { Mask, SpinLoading } from 'antd-mobile'
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