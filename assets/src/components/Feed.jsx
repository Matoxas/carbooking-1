import React, { Component } from "react";
import Items from "./items";
import Topbar from "./topbar/topbar";
import { inject, observer } from "mobx-react";
import Loading from "./loading";
import "./topbar/topbar.css";

@inject("CarStore")
@observer
class Feed extends Component {
  constructor() {
    super();
    this.state = {
      toggler: false
    };
  }

  componentDidMount() {
    this.props.CarStore.getBrands();
  }

  toggleMobile = () => {
    const { toggler } = this.state;
    this.setState({
      toggler: !toggler
    });
  };

  render() {
    const { toggler } = this.state;
    const { loading } = this.props.CarStore;

    const topbar = (
      <div>
        <div
          onClick={() => this.toggleMobile()}
          className="mobile-menu topbar col-12 margin-bottom"
        >
          <h2 className="text-center padding">RODYTI FILTRUS</h2>
        </div>
        <div className="row justify-content-md-end">
          <div className={`col-12 ${toggler == 0 ? "m-hidden" : ""}`}>
            <Topbar />
          </div>
        </div>
      </div>
    );

    if (loading) {
      return (
        <div className="main">
          <div className="container">
            {topbar}
            <div className="flex flex-center mt-5 text-center">
              <Loading className={"loading"} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="main">
        <div className="container">
          {topbar}
          <div className="row">
            <div className="col-lg-12">
              <Items />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
