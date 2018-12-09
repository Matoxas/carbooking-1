import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Item from "./item";
import Loading from "../loading";

@inject("CarStore")
@observer
class Items extends Component {
  render() {
    const { loading: load, cars } = this.props.CarStore;

    return (
      <div>
        <div className="row">
          {cars.map(car => (
            <div key={car.id} className="col-sm-6 col-md-4 col-lg-3">
              <Item car={car} />
            </div>
          ))}
        </div>
        {load.cars && (
          <div className="flex flex-center mt-5 mb-5 text-center">
            <Loading className={"loading"} />
          </div>
        )}
      </div>
    );
  }
}

export default Items;
