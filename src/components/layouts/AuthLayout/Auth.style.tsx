import styled from "styled-components";

export const AuthBackgroundStyle = styled.div`
  height: 100%;
  background-color: black;
`;

type CarouselItemProps = {
  url: string;
};

export const CarouselItemStyle = styled.div<CarouselItemProps>`
  height: 100vh;
  opacity: 30%;
  background-size: cover;
  background-position-x: right;
  background-position-y: bottom;
  background-image: url(${(props) => props.url});
`;

export const AuthContainerStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const AuthLayoutStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AuthFooterStyle = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  .ant-typography {
    color: white;
  }
`;
