// import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Homepage from "./pages/Homepage";
import Detail from "./pages/Detail";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/pokemon" component={Homepage} exact />
          <Route path="/pokemon/:id" component={Detail} exact />
          <Route exact path="/" render={() => <Redirect to="/pokemon" />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
