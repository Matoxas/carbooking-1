import React, { Component } from "react";

export default class MyGreatPlaceWithControllableHover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={(this.props.showPopUp ? "open" : "") + " top"}>
        <p>
          {this.props.data.name} |{" "}
          <span className="light-text">{this.props.data.price} €</span>
        </p>
        <i />
      </div>
    );
  }
}
