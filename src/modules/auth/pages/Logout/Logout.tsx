import { Button, Result } from "antd";
import AuthRoutes from "modules/auth/auth.routes";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoutPage = () => {
  return (
    <LogoutPageStyle>
      <Result
        status="success"
        title="Has terminado la sesión"
        subTitle="Has terminado la sesión correctamente"
        extra={[
          <Button type="link">
            <Link to={AuthRoutes.login}>Volver a iniciar sesión</Link>
          </Button>,
        ]}
      />
    </LogoutPageStyle>
  );
};

export const LogoutPageStyle = styled.div`
  padding: 1rem;
  background-color: white !important;
  min-width: 350px;
  max-width: 500px;
  border-radius: 10px;
  width: 100%;
`;

export default LogoutPage;
