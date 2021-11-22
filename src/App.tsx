// import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Detail from "./pages/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/pokemon/{id}" component={Detail} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
