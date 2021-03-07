import { BrowserRouter, Switch, Route } from "react-router-dom";
// import React, {useState, useEffect} from "react";
import HomePage from "./components/HomePage";
import OwnerEventRegister from "./components/owner/OwnerEventRegister";
import AllEventsList from "./components/event/AllEventsList";
import OwnerAllEventsList from "./components/owner/OwnerAllEventsList";
import EventPage from "./components/event/EventPage";
import UserLogin from "./components/user/UserLogin";
import OwnerLogin from "./components/owner/OwnerLogin";
import OwnerMypage from "./components/owner/OwnerMypage";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact path={'/'}
            render = {props => (<HomePage {...props}/>)}
          />
          <Route
            exact path={'/allevents'}
            render = {props => (<AllEventsList {...props}/>)}
          />
          <Route
            // idではなく:idにしないとダメ
            exact path={'/event/:id'}
            render = {props => (<EventPage {...props}/>)}
          />
          <Route
            exact path={'/login'}
            render = {props => (<UserLogin {...props}/>)}
          />
          <Route
            exact path={'/ownerlogin'}
            render = {props => (<OwnerLogin {...props}/>)}
          />
          <Route
            exact path={'/owner/:id'}
            render = {props => (<OwnerMypage {...props}/>)}
          />
          <Route
            exact path={'/owner/:id/allevents'}
            render = {props => (<OwnerAllEventsList {...props}/>)}
          />
          <Route
            exact path={'/owner/:id/eventregister'}
            render = {props => (<OwnerEventRegister {...props}/>)}
          />
        </Switch>
      </BrowserRouter>
    </div>  
  );
}

export default App;
