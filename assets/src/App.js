import React, { Component } from "react";
import { Router } from "react-router-dom";
import { inject, observer } from "mobx-react";
import history from "./history";
import Routes from "./Routes";
import Temporary from "./components/temporary";
import "./style/App.css";
import { dontShowPage } from "./rootConfig";

@inject("CarStore")
@observer
class App extends Component {
  componentDidMount() {
    {
      this.loadDataFromStore();
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

  loadDataFromStore = () => {
    this.props.CarStore.getAllCars();
    this.props.CarStore.getBrands();
  };

  render() {
    

    if (dontShowPage) {
      return <Temporary />;
    }

    return (
      <Router history={history}>
        <Routes />
      </Router>
    );
  }
}

export default App;
