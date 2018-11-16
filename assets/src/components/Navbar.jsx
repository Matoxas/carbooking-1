import React from "react";
import { NavLink } from "react-router-dom";
import "../style/Navbar.css";
import Logo from "./logo";

const Navbar = () => {
  return (
    <header className="masthead mb-auto padding-top text-center margin-bottom">
      <div className="container">
        <div className="inner">
          <Logo className="masthead-brand" />
          <nav className="nav nav-masthead justify-content-center">
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
};

export default Navbar;
