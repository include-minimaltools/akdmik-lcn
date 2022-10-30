import styled from "styled-components";

export const LogoStyle = styled.div<{ url: string }>`
  height: 100px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
  background-image: url(${({ url }) => url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const TitleSectionStyle = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  justify-content: center;
  text-align: center;
`;

export const ContainerStyle = styled.div`
  flex: 1;
  margin: 24px 16px 0;
  overflow: initial;
  background-color: white;
  border-radius: 1rem;
`;
