import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div>
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
        }
      />
    </div>
  );
};

export default Loading;
