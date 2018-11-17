import React from "react";
import "../../style/index.css";
import Logo from "../logo";
import ArrorDown from "./arrowDown";
import Map from "../Map";
import Searchbar from "./Searchbar";
const Index = props => {
  return (
    <div id={props.id} className="container padding-top">
      <div className="flex flex-center flex-column fullHeight text-center">
        <div className="index-logo-wrapper">
          <div className="index-logo-wrapper-logo">
            <Logo className="logo" />
          </div>
          <div className="index-logo-wrapper-text">
            <h2>paprasta patogu lengva</h2>
          </div>
        </div>
        <Searchbar />
        <a href="#main" className="scroll-down">
          <ArrorDown />
        </a>
      </div>
    </div>
  );
};

export default Index;
