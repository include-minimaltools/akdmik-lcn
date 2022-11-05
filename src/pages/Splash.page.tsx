import { LoadingOutlined } from "@ant-design/icons";
import { FC } from "react";
import { SplashScreenStyle } from "styles/Splash.style";

const SplashScreen: FC = () => {
  return (
    <SplashScreenStyle>
      <LoadingOutlined spin style={{ fontSize: "50px" }} />
    </SplashScreenStyle>
  );
};

export default SplashScreen;
