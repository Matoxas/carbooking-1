import React from "react";
import { Route, Redirect } from "react-router-dom";
import Switch from "react-router-dom/Switch";

//Components
import Feed from "./components/feed/Feed";
import Navbar from "./components/navbar/Navbar";
import Index from "./components/index/Index";
import carListing from "./components/carListing/carListing";
import MainNavigation from "./components/main-navigation";
import Favourites from "./components/feed/Favourites";
import NewCar from "./components/newCar/NewCar";
import Footer from "./components/footer/footer";
import ItemNotFoundContainer from './components/404/404Container';
import MapContainer from "./components/map/mapContainer";

const Routes = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/newCar" component={NewCar} exact />
        <Route component={indexRoutes} />
      </Switch>
      <Footer />
    </div>
  );
};

const indexRoutes = () => (
  <div>
    <Index />
    <div className="main-wrapper" id="mainNav">
      <MainNavigation />
        <Switch>
            <Route path="/feed/carListing/:id" component={carListing} />
            <Route path="/feed/:hash" component={Feed} />
            <Redirect from="/" exact to="/feed" />
            <Route path="/map" component={MapContainer} exact />
            <Route path="/404" component={ItemNotFoundContainer} />
            <Route path="/favourites" component={Favourites} exact />
            <Route component={Feed} />
        </Switch>
    </div>
  </div>
);

export default Routes;
