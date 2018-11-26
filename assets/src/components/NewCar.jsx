import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("CarStore")
@observer
class NewCar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    this.props.CarStore.toggleHeader(true);
  }

  render() {
    return (
      <div className="main main-wrapper fullHeight">
        <div className="container">
          <h2>Hello</h2>
        </div>
      </div>
    );
  }
}

export default NewCar;
