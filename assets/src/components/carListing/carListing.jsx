import React, { Component } from "react";
import CarInfo from "./carInfo";
import CarImage from "./carImage";
import MapContainer from "../MapContainer";

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

  getCar() {
    const routeId = this.props.match.params.id;
    const { CarStore } = this.props;
    CarStore.GetCar(routeId);
  }

  ShowCalendar = () => {
    this.setState({ showCalendar: true });
  };

  render() {
    const { loading } = this.props.CarStore;

    if (loading) {
      return <h2>loading</h2>;
    } else {
      this.getCar();
      const car = this.props.CarStore.currentCar;

      return (
        <div className="product">
          <div className="container card">
              <div>
                  <CarImage image={car} />
              </div>
              <div className="row">
                  <div className="col-sm-1"/>
                  <div className="col-sm-10">
                      <CarInfo car={car} />
                  </div>
                  <div className="col-sm-1"/>
              </div>
          </div>
          <div>
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
}

export default CarListing;
