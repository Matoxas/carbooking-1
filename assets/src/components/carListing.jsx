import React, { Component } from "react";
import { inject, observer } from "mobx-react";
@inject("CarStore")
@observer
class carListing extends Component {
  getCar() {
    const routeId = this.props.match.params.id;
    const { CarStore } = this.props;
    CarStore.GetCar(routeId);
  }
  render() {
      const {loading} = this.props.CarStore;

      if (loading) {
          return <h2>loading</h2>
      } else {
          this.getCar();
          const car = this.props.CarStore.currentCar;
          return (
              <div className="main">
                  <div className="container margin-top">
                      <div className="card">
                          <div className="card-body">
                              <div className="row">
                                  <div className="col-sm-6">
                                      <h3>Pavadinimas: {car.brand + " " + car.model}</h3>
                                      <h3>Paros kaina: €{car.price}</h3>
                                      <h3>Automobilio vieta: {car.city}</h3>
                                      <hr/>
                                      <h3>Vartotojo el.paštas: {car.email}</h3>
                                      <h3>Vartotojo telefonas: {car.phone}</h3>
                                  </div>
                                  <div className="col-sm-6">
                                      <div className="card-image">
                                          <img
                                              src="https://i.ytimg.com/vi/iVbopWyBR5Y/maxresdefault.jpg"
                                              alt=""
                                          />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          );
      }
  }
}

export default carListing;

// console.log();
