import React, { Component } from "react";

export default class MyGreatPlaceWithControllableHover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hint hint--html hint--info hint--top">
        <div>{this.props.text}</div>
        <div style={{ width: 80 }} className="hint__content">
          Сlick me
        </div>
      </div>
    );
  }
}
