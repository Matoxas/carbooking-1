import React from "react";
import Map from "./GoogleMap/index";
import MapTopbar from "./mapTopbar";
import { inject, observer } from "mobx-react";
import LoadModal from "../editCar/loadModal";

@inject("CarStore")
@observer
class mapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { key: 1 };
  }

  render() {
    const { loading } = this.props.CarStore;

    return (
      <div className="main">
        <LoadModal open={loading.cars} />
        <div className="container">
          <MapTopbar reRenderMap={this.reRenderMap} />
          <Map />
        </div>
      </div>
    );
  }
}

export default mapContainer;
