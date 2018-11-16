import React from "react";
import "../style/index.css";
import Logo from "./logo";
import ArrorDown from "./arrowDown";
import Map from "./Map";
const Index = props => {
  return (
    <div id={props.id} className="container padding-top">
      <div className="flex flex-center fullHeight text-center">
        <a href="#main" className="scroll-down">
          <ArrorDown />
        </a>
      </div>
    </div>
  );
};

export default Index;
