import styled from "styled-components";

export const DashboardStyle = styled.div`
  background-color: #f0f2f5;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(500px, auto));
  
  .first-graph {
    grid-column: 1/3;
  }

  .ant-card {
    border-radius: 1rem;
  }
`;