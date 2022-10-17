import styled from "styled-components";

export const CardStyle = styled.div`
  padding: 1rem;
  background-color: white !important;
  min-width: 350px;
  max-width: 500px;
  border-radius: 10px;
  width: 100%;

  .login-icon {
    border-radius: 0.5rem;
  }

  .login-title {
    text-align: center;
  }
`;

export const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export const ContentStyle = styled.div`
  margin-inline: 2rem;
`;
