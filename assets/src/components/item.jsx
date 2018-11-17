import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class Item extends Component {
  render() {
    const { car } = this.props;
    return (
      <Link to={`/feed/carListing/${car.id}`}>
        <div className="card">
          <div className="card-body">
            <div className="card-image">
              <img src={`/${car.images[0]}`} alt="" />
            </div>
            <p className="card-time">{moment(car.createdAt).fromNow()}</p>
            <h5 className="card-title">{car.brand}</h5>
            <h5 className="card-title card-title--price">€ {car.price}</h5>
            <h5 className="card-title card-title--sub">{car.model}</h5>
          </div>
        </div>
      </Link>
    );
  }
}

export default Item;
