import React from "react";
import { useHistory } from "react-router-dom";
import { Detector } from "react-detect-offline";
import Styled from "./style";
import useToast from "./toast";

export const MainLayout: React.FC<{ backButton?: boolean }> = ({
  backButton,
  children,
}) => {
  const history = useHistory();
  const [ToastOffline, setToast] = useToast({ offlineMode: true });

  return (
    <Styled.MainContainer>
      <Detector
        onChange={() => setToast({ message: "You are offline!" })}
        render={({ online }) => (online ? null : <ToastOffline />)}
      />
      <Styled.MainWrapper>
        {backButton ? (
          <Styled.IconChevron onClick={() => history.goBack()} />
        ) : null}
        {children}
      </Styled.MainWrapper>
    </Styled.MainContainer>
  );
};
