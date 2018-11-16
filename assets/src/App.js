import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";

// Components
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import Switch from "react-router-dom/Switch";
import carListing from "./components/carListing/carListing";
import MainNavigation from "./components/main-navigation";

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
              <Route path="/feed/carListing/:id" component={carListing} exact />
              <Route path="/" component={Feed} exact />
              <Route path="/feed" component={Feed} exact />
              <Route component={Index} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
