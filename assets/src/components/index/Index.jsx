import React from "react";
import "../../style/index.css";
import Logo from "../logo";
import ArrorDown from "./arrowDown";
import Searchbar from "./Searchbar";
// import ScrollableAnchor from "react-scrollable-anchor";
const Index = props => {
  return (
    <div className="container pt-4">
      <div id={props.id}>
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
          <a href="#main" className="scroll-down">
            <ArrorDown />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
