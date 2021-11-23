import React, { useContext } from "react";
import { Box, Tabs, Tab, createTheme, ThemeProvider } from "@mui/material";
import styled, { ThemeContext } from "styled-components";

interface ITabPanel {
  selected: boolean;
  index: number;
  bgColors?: string;
}
interface ITab {
  tabName: { category: string; name: string }[];
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  value: string;
  mainColors?: string;
}

const Styled = {
  Tab: styled(Tab)`
    &&& {
      text-transform: none;
    }
  `,
  TabContentWrapper: styled.div`
    padding: 26px 12px;
  `,
};

export const TabPanel: React.FC<ITabPanel> = ({
  selected,
  index,
  children,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={!selected}
      aria-labelledby={`simple-tab-${index}`}
    >
      {selected && (
        <Styled.TabContentWrapper>
          <div>{children}</div>
        </Styled.TabContentWrapper>
      )}
    </div>
  );
};

const BasicTabs: React.FC<ITab> = ({
  tabName = [],
  value,
  onChange,
  mainColors = "unknown",
  children,
}) => {
  const themeContext = useContext(ThemeContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: themeContext.colors[`pokemon-${mainColors}`],
      },
    },
  });

  return (
    <Box sx={{ width: "100%" }}>
      <ThemeProvider theme={theme}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={onChange} variant="scrollable">
            {tabName.map((val, i) => (
              <Styled.Tab
                className="tabsz"
                key={i}
                label={val.name}
                value={val.category}
              />
            ))}
          </Tabs>
        </Box>
        {children}
      </ThemeProvider>
    </Box>
  );
};

export default BasicTabs;
