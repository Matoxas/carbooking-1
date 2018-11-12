import React, { Component } from "react";

class Item extends Component {
  render() {
    const { car } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-image">
            <img src={car.image} alt="" />
          </div>
          <p className="card-time">3 hours ago</p>
          <h5 className="card-title">{car.brand}</h5>
          <h5 className="card-title card-title--price">€ {car.price}</h5>
          <h5 className="card-title card-title--sub">{car.subbrand}</h5>
        </div>
      </div>
    );
  }
}

export default Item;
