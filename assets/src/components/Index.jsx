import React from "react";
import "../style/index.css";
import { Link } from "react-router-dom";
import Logo from "./logo";
const Index = () => {
  return (
    <div className="container padding-top">
      <div className="flex flex-center fullHeight text-center">
        <div>
          <div className="row mb-4">
            <div className="col-lg-6 index-logo-wrapper">
              <div />
              <Logo className="logo" />
            </div>
            <div className="col-lg-6">
              <h2>Nuomotis dar niekada nebuvo taip patogu</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="searchform">{/* <h2>hello</h2> */}</div>
            </div>
          </div>
        </div>
        <Link to="/feed" className="scroll-down" />
      </div>
    </div>
  );
};

export default Index;
