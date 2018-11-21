import React, { Component } from "react";
import "../../style/index.css";
import Logo from "../logo";
import ArrorDown from "./arrowDown";
import Searchbar from "./Searchbar";
import $ from "jquery";

class Index extends Component {
  render() {
    return (
      <div className="container pt-4">
        <div id="index">
          <div className="flex flex-center flex-column fullHeight text-center">
            <div className="index-logo-wrapper">
              <div className="index-logo-wrapper-logo">
                <Logo className="logo" />
              </div>
              <div className="index-logo-wrapper-text">
                <h2>paprastai patogiai greitai</h2>
              </div>
            </div>
            <Searchbar />
          </div>
          <a href="#mainNav" className="scroll-down srollink">
            <ArrorDown />
          </a>
        </div>
      </div>
    );
  }
}

export default Index;

// const scrollink = $(".nav-link");
// scrollink.click(function(e) {
//   e.preventDefault();
//   $("body, html").animate({ scrollTop: $(this.hash).offset().top }, 1000);
// });
