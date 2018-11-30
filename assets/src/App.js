import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import history from "./history";
// Components
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Index from "./components/index/Index";
import Switch from "react-router-dom/Switch";
import carListing from "./components/carListing/carListing";
import MainNavigation from "./components/main-navigation";
import Map from "./components/Map";
import Favourites from "./components/Favourites";
import Temporary from "./components/temporary";
import NewCar from "./components/newCar/NewCar";

@inject("CarStore")
@observer
class App extends Component {
  componentDidMount() {
    {
      this.props.CarStore.getAllCars();
      this.props.CarStore.getBrands();
      this.props.CarStore.test();
      this.loadLikesFromStorage();
    }
  }

  loadLikesFromStorage = () => {
    const local = localStorage.getItem("likes");
    const likes = JSON.parse(local);
    if (likes) {
      this.props.CarStore.setLikes(likes);
    }
  };

  render() {
    const { showHeader } = this.props.CarStore;
    const dontShowPage = false;

    if (dontShowPage) {
      return <Temporary />;
    }

    if (!showHeader) {
      return (
        <Router history={history}>
          <div>
            <Navbar />
            <Switch>
              <Route path="/newcar" component={NewCar} exact />
            </Switch>
          </div>
        </Router>
      );
    }

    return (
      <Router history={history}>
        <div>
          <Navbar />
          <Index />
          <div className="main-wrapper" id="mainNav">
            <MainNavigation />
            <Switch>
              <Route path="/newcar" component={NewCar} />
              <Route path="/feed/carListing/:id" component={carListing} />
              <Route path="/feed" component={Feed} />
              <Redirect from="/" exact to="/feed" />
              <Route path="/map" component={Map} exact />
              <Route path="/favourites" component={Favourites} exact />
              <Route component={Feed} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
