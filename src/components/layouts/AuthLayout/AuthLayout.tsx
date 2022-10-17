import { Carousel, Typography } from "antd";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import {
  AuthBackgroundStyle,
  AuthContainerStyle,
  AuthFooterStyle,
  AuthLayoutStyle,
  CarouselItemStyle,
} from "./Auth.style";

const imageUrls = [
  "/assets/bg-lcn-1.jpg",
  "/assets/bg-lcn-2.jpg",
  "/assets/bg-lcn-4.jpg",
];

const { Text, Title } = Typography;

const AuthLayout: FC = () => {
  return (
    <AuthBackgroundStyle>
      <Carousel autoplay effect="fade" dots={false}>
        {imageUrls.map((url, index) => (
          <CarouselItemStyle key={index} url={url} />
        ))}
      </Carousel>
      <AuthContainerStyle>
        <AuthLayoutStyle>
          <Outlet />
        </AuthLayoutStyle>
        <AuthFooterStyle>
          <Title level={5}>AKDMIK ©2022 Created by HSC Minimal Tools</Title>
          <Text>Sistema de Registro de Notas</Text>
        </AuthFooterStyle>
      </AuthContainerStyle>
    </AuthBackgroundStyle>
  );
};

export default AuthLayout;
