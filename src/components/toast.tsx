import { Alert, Snackbar } from "@mui/material";
import React from "react";
import styled from "styled-components/macro";

type UseToast = [React.FC, (property: { message: string }) => void];
interface Params {
  offlineMode?: boolean;
}

const defaultToastProperty = {
  message: "",
};

const StyledAlert = styled(Alert)`
  &&& {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    height: 80px;
    border: 1px solid rgb(95, 33, 32);
  }
`;

function useToast(params?: Params): UseToast {
  const [visible, setVisible] = React.useState<boolean>(
    params?.offlineMode || false
  );
  const [toastProperty, setProperty] = React.useState<{ message: string }>(
    () => ({
      ...defaultToastProperty,
    })
  );

  const setToast = React.useCallback(
    (property) => {
      setProperty({ ...defaultToastProperty, ...property });
      setVisible(true);
    },
    [setVisible, setProperty]
  );

  const Toast: React.FC = () => (
    <Snackbar
      open={visible}
      autoHideDuration={params?.offlineMode ? null : 1500}
      onClose={() => setVisible(false)}
    >
      {params?.offlineMode ? (
        <StyledAlert severity="warning">You are offline!</StyledAlert>
      ) : (
        <Alert severity="error" sx={{ width: "100%", fontWeight: 700 }}>
          {toastProperty.message}
        </Alert>
      )}
    </Snackbar>
  );

  return [Toast, setToast];
}

export default useToast;
