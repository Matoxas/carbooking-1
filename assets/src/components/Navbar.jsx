import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../style/Navbar.css";
import Logo from "./logo";
import jQuery from "jquery";

class Navbar extends Component {
  componentDidMount() {
    const myDiv = document.getElementsByClassName("nav-link");
    for (let i = 0; i < myDiv.length; i++) {
      myDiv[i].addEventListener("click", e => {
        this.handleKey(e);
      });
    }
  }

  componentWillUnmount() {
    // const myDiv = document.getElementsByClassName("nav-link");
    // myDiv.removeEventListener("click", this.handleKey);
  }

  handleKey = e => {
    e.preventDefault();
    console.log(e);
  };

  render() {
    return (
      <header className="masthead mb-auto padding-top text-center margin-bottom">
        <div className="container">
          <div className="inner">
            <div className="logo-mask">
              <Logo className="masthead-brand" />
            </div>
            <nav className="nav nav-masthead justify-content-center">
              <a href="#index" className="nav-link--hl">
                nuomoti dabar
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
