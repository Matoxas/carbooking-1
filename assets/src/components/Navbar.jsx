import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../style/Navbar.css";
import Logo from "./logo";
import ScrollableAnchor from "react-scrollable-anchor";

class Navbar extends Component {
  componentDidMount() {}

  render() {
    return (
      <header className="masthead mb-auto padding-top text-center">
        <div className="container">
          <div className="inner">
            <div className="logo-mask">
              <Logo className="masthead-brand" />
            </div>
            <nav className="nav nav-masthead justify-content-center">
              <a href="#index" className="nav-link--hl">
                Nuomoti dabar
              </a>
              <a href="#index" className="nav-link">
                Pagrindinis
              </a>
              <a href="#main" className="nav-link">
                Nuomotis
              </a>
            </nav>
            <div className="clearfix" />
          </div>
        </div>
      </header>
    );
  }
}

export default Navbar;
