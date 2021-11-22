import React from "react";
import Styled from "./style";

export const MainLayout: React.FC = ({ children }) => {
  return (
    <Styled.MainContainer>
      <Styled.MainWrapper>{children}</Styled.MainWrapper>
    </Styled.MainContainer>
  );
};
