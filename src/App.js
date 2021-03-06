import { BrowserRouter, Switch, Route } from "react-router-dom";
// import React, {useState, useEffect} from "react";
import HomePage from "./components/HomePage";
import OwnerPage from "./components/owner/OwnerPage";
import EventsPage from "./components/event/EventsPage";
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
            exact path={'/owner'}
            render = {props => (<OwnerPage {...props}/>)}
          />
          <Route
            exact path={'/events'}
            render = {props => (<EventsPage {...props}/>)}
          />
          <Route
            // idではなく:idにしないとダメ
            path={'/event/:id'}
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
            // idではなく:idにしないとダメ
            path={'/owner/:id'}
            render = {props => (<OwnerMypage {...props}/>)}
          />
        </Switch>
      </BrowserRouter>
    </div>  
  );
}

export default App;
