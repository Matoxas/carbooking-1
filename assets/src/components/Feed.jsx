import React, { Component } from "react";
import Items from "./items";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      toggler: false
    };
  }

  toggleMobile = () => {
    const { toggler } = this.state;
    this.setState({
      toggler: !toggler
    });

    console.log(toggler);
  };

  render() {
    const { toggler } = this.state;
    return (
      <div className="main">
        <div className="container">
          <div
            onClick={() => this.toggleMobile()}
            className="mobile-menu topbar col-12 margin-bottom"
          >
            <h2 className="text-center padding">RODYTI FILTRUS</h2>
          </div>
          <div className="row justify-content-md-end">
            <div
              className={`col-md-9 col-lg-10 ${toggler == 0 ? "m-hidden" : ""}`}
            >
              <Topbar />
            </div>
          </div>
          <div className="row">
            <div
              className={`col-md-3 col-lg-2 margin-bottom ${
                toggler == 0 ? "m-hidden" : ""
              }`}
            >
              <Sidebar />
            </div>
            <div className="col-md-9 col-lg-10">
              <Items />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
