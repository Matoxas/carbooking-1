import React, { Component } from "react";
import Items from "./items";
import Topbar from "../topbar/topbar";
import { inject, observer } from "mobx-react";
import Loading from "../loading";
import "../topbar/topbar.css";
import "./feed.css";
import NoResults from "./NoResults";
import axios from "axios";
import EditCar from "../editCar/EditCar";
@inject("CarStore")
@observer
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      editableCar: {}
    };
  }

  componentDidMount() {
    this.checkIfHashValid();
  }

  checkIfHashValid = () => {
    const params = this.props.match.params;
    if (params.hash) {
      axios
        .get("/car/" + params.hash)
        .then(response => {
          if (response.data.data) {
            this.setState({
              editableCar: response.data.data
            });
          }
        })
        .catch(error => {
          return error;
        });
    }
  };

  toggleMobile = () => {
    const { toggler } = this.state;
    this.setState({
      toggler: !toggler
    });
  };

  render() {
    const { toggler } = this.state;
    const { loading: load, cars } = this.props.CarStore;

    const topbar = (
      <div>
        <div
          onClick={() => this.toggleMobile()}
          className="mobile-menu topbar col-12 margin-bottom"
        >
          <h2 className="text-center padding">RODYTI FILTRUS</h2>
        </div>
        <div className="row justify-content-md-end">
          <div className={`col-12 ${toggler == 0 ? "m-hidden" : ""}`}>
            <Topbar />
          </div>
        </div>
      </div>
    );

    if ((load.cars && cars.length == 0) || load.brands) {
      return (
        <div className="main">
          <div className="container">
            {topbar}
            <div className="flex flex-center mt-5 text-center">
              <Loading className={"loading"} />
            </div>
          </div>
        </div>
      );
    }

    if (cars.length == 0) {
      return (
        <div className="main">
          <div className="container">
            {topbar}
            <NoResults />
          </div>
        </div>
      );
    }

    return (
      <div className="main">
        <div className="container">
          {topbar}
          <div className="row">
            <div className="col-lg-12">
              <Items />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
