import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
moment.locale("lt");

@inject("CarStore")
@observer
class Item extends Component {
  handleLikeSubmit = (e, car) => {
    e.preventDefault();
    const { likesToggler } = this.props.CarStore;
    likesToggler(car);
  };

  isLiked = () => {
    const { car } = this.props;
    const { likedCars } = this.props.CarStore;

    return likedCars.includes(car.id);
  };

  render() {
    const { car } = this.props;
    return (
      <Link to={`/feed/carListing/${car.id}`}>
        <div className="card">
          <div className="card-body">
            <div className="card-image">
              <img src={`/${car.images[0]}`} alt="" />
            </div>
            <p className="card-time">{moment(car.createdAt).fromNow(true)}</p>
            <p
              onClick={e => this.handleLikeSubmit(e, car.id)}
              className="card-like"
            >
              <i className={(this.isLiked() ? "fas" : "far") + " fa-heart"} />
            </p>
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
