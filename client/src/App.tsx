import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/sign-up";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      <Switch>
        <Route path="/sign-up">
          <Signup />
        </Route>
      </Switch>
    </>
  );
}

export default App;
