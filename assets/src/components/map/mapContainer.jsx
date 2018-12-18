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
    this.state = {
      toggler: false
    };
  }

  toggleMobile = () => {
    const { toggler } = this.state;
    this.setState({
      toggler: !toggler
    });
  };

  render() {
    const { loading } = this.props.CarStore;

    return (
      <div className="main">
        <LoadModal open={loading.cars} />
        <div className="container">
          <div
            onClick={() => this.toggleMobile()}
            className="mobile-menu topbar col-12 margin-bottom"
          >
            <h2 className="text-center padding">RODYTI FILTRUS</h2>
          </div>
          <div className="row justify-content-md-end">
            <div
              className={`col-12 ${this.state.toggler == 0 ? "m-hidden" : ""}`}
            >
              <MapTopbar />
            </div>
            <div className="col-12">
              <Map />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default mapContainer;
