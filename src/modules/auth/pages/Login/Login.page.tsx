import { Card, Image, Typography } from "antd";
import { LoginForm } from "modules/auth/components";
import { FC } from "react";
import { HeaderStyle, CardStyle, ContentStyle } from "./Login.style";

const { Title } = Typography;

const LoginPage: FC = () => {
  return (
    <CardStyle>
      <HeaderStyle>
        <Image preview={false} className="login-icon" width={100} src="/assets/icon-lcn.png" />
        <Title className="login-title" level={2}>Liceo Cultural Nicaragüense</Title>
      </HeaderStyle>
      <ContentStyle>
        <LoginForm />
      </ContentStyle>
    </CardStyle>
  );
};

export default LoginPage;
