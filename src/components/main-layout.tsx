import React from "react";
import { useHistory } from "react-router-dom";
import Styled from "./style";

export const MainLayout: React.FC<{ backButton?: boolean }> = ({
  backButton,
  children,
}) => {
  const history = useHistory();

  return (
    <Styled.MainContainer>
      <Styled.MainWrapper>
        {backButton ? (
          <Styled.IconChevron onClick={() => history.goBack()} />
        ) : null}
        {children}
      </Styled.MainWrapper>
    </Styled.MainContainer>
  );
};
