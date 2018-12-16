import React, { Component } from "react";
import "../../style/index.css";
import Logo from "../../extras/logo";
import ArrorDown from "./arrowDown";
import Searchbar from "./Searchbar";
import $ from "jquery";

class Index extends Component {
  handleClick = e => {
    e.preventDefault();
    $("body, html").animate({ scrollTop: $("#mainNav").offset().top }, 1000);
  };
  render() {
    return (
      <div className="index">
        <div className="container">
          <div
            id="index"
            className="flex flex-center flex-column relative fullHeight text-center"
          >
            <div className="index-logo-wrapper">
              <div className="index-logo-wrapper-logo">
                <Logo className="logo" />
              </div>
              <div className="index-logo-wrapper-text">
                <h2>paprastai patogiai greitai</h2>
              </div>
            </div>
            <Searchbar />
            <a
              href="#mainNav"
              onClick={this.handleClick}
              className="scroll-down srollink"
            >
              <ArrorDown />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
