import React, { Component } from "react";
import CarInfo from "./carInfo";
import CarImage from "./carImage";
import MapContainer from "../MapContainer";
import $ from "jquery";
import Loading from "../loading";

import { inject, observer } from "mobx-react";
@inject("CarStore")
@observer
class CarListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarShowing: false,
      place: null,
      lat: 0
    };
  }

  componentDidMount() {
    $("body, html").animate({ scrollTop: $("#mainNav").offset().top }, 1000);
  }

  getCar() {
    const routeId = this.props.match.params.id;
    const { CarStore } = this.props;
    CarStore.GetCar(routeId);
  }

  ShowCalendar = () => {
    this.setState({ showCalendar: true });
  };

  render() {
    const { loading: load } = this.props.CarStore;

    if (load.cars || load.brands) {
      return (
        <div className="main">
          <div className="container">
            <div className="flex flex-center fullHeight">
              <Loading className={"loading"} />
            </div>
          </div>
        </div>
      );
    }
    this.getCar();
    const car = this.props.CarStore.currentCar;

    return (
      <div className="product">
        <div className="container card">
          <div>
            <CarImage image={car} />
          </div>
          <div className="row">
            <div className="col-md-11">
              <CarInfo car={car} />
            </div>
            <div className="col-md-1" />
          </div>
            <MapContainer
                latitude={car.latitude}
                longitude={car.longitude}
                zoom={16}
            />
        </div>
      </div>
    );
  }
}

export default CarListing;
