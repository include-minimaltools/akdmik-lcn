import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { NotFoundPageStyle } from "styles/NotFound.style";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <NotFoundPageStyle>
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página que intentas acceder no existe"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </NotFoundPageStyle>
  );
};

export default NotFoundPage;
