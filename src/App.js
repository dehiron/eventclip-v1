import { BrowserRouter, Switch, Route } from "react-router-dom";
// import React, {useState, useEffect} from "react";
import HomePage from "./components/HomePage";
import OwnerPage from "./components/OwnerPage";
import EventsPage from "./components/EventsPage";
import EventPage from "./components/EventPage";

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
        </Switch>
      </BrowserRouter>
    </div>  
  );
}

export default App;
