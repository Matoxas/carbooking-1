import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Item from "./item";

@inject("CarStore")
@observer
class Items extends Component {
  render() {
    const { cars } = this.props.CarStore;

    return (
      <div className="row">
        {cars.map(car => (
          <div key={car.id} className="col-sm-6 col-lg-4">
            <Item car={car} />
          </div>
        ))}
      </div>
    );
  }
}

export default Items;
