import { BrowserRouter, Switch, Route } from "react-router-dom";
// import React, {useState, useEffect} from "react";
import Home from "./components/Home";
import OwnerPage from "./components/OwnerPage"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact path={'/'}
            render = {props => (<Home {...props}/>)}
          />
          <Route
            exact path={'/ownerpage'}
            render = {props => (
              <OwnerPage {...props}/>
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>  
  );
}

export default App;
