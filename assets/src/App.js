import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

// Components
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Index from "./components/index/Index";
import Switch from "react-router-dom/Switch";
import carListing from "./components/carListing/carListing";
import MainNavigation from "./components/main-navigation";
import Map from "./components/Map";
import Favourites from "./components/Favourites";

@inject("CarStore")
@observer
class App extends Component {
  componentDidMount() {
    {
      this.props.CarStore.getAllCars();
    }
  }

  setCars = () => {};

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Index id="index" />
          <div id="main" className="main-wrapper">
            <MainNavigation />
            <Switch>
              <Route path="/feed/carListing/:id" component={carListing} />
              <Route path="/feed" component={Feed} />
              <Redirect from="/" exact to="/feed" />
              <Route path="/map" component={Map} exact />
              <Route path="/favourites" component={Favourites} exact />
              <Route component={Feed} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
