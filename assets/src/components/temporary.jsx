import React, { Component } from "react";
import Logo from "./logo";

class temporary extends Component {
  constructor() {
    super();
    this.state = {
      toggler: true
    };
  }

  componentDidMount() {
    setInterval(() => this.KeepToggling(), 2000);
  }

  KeepToggling = () => {
    this.setState({
      toggler: !this.state.toggler
    });
  };

  render() {
    return (
      <div className="container">
        <div className="flex flex-center fullHeight">
          <div
            className={`logo ${
              this.state.toggler ? "logo-orange" : "logo-red"
            }`}
          >
            <Logo />
          </div>
        </div>
      </div>
    );
  }
}

export default temporary;
