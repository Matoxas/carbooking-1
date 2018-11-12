import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";

// Components
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import Switch from "react-router-dom/Switch";
import carListing from "./components/carListing";

@inject("CarStore")
@observer
class App extends Component {
  componentDidMount() {
    {
      this.props.CarStore.setCars("asd");
    }
  }

  setCars = carList => {
    console.log(carList);
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route path = "/carListing" component={carListing} exact/>
              <Route path="/" component={Index} exact />
              <Route path="/feed" component={Feed} exact />
              <Route component={Index} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
