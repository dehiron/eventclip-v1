import { BrowserRouter, Switch, Route } from "react-router-dom";
// import React, {useState, useEffect} from "react";
import Home from "./components/Home";
import OwnerPage from "./components/OwnerPage";
import Map from "./components/Map";

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
          <Route
            exact path={'/map'}
            render = {props => (
              <Map {...props}/>
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>  
  );
}

export default App;
