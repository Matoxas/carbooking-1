import React, { Component } from "react";

export default class MyGreatPlaceWithControllableHover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data) {
      return (
        <div className={(this.props.showPopUp ? "open" : "") + " top"}>
          <p>
            {this.props.data.name} |
            <span className="light-text"> {this.props.data.price} €</span>
          </p>
          <i />
        </div>
      );
    }
    if (this.props.priceRange) {
      return (
        <div
          className={(this.props.showPopUp ? "open" : "") + " top priceRange"}
        >
          <p className="text-center">
            <span className="light-text">{this.props.priceRange}</span>
          </p>
          <i />
        </div>
      );
    }
  }
}
