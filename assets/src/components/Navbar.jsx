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
            <NavLink to="/" exact={true} className="nav-link">
              Pagrindinis
            </NavLink>
            <NavLink to="/feed" className="nav-link">
              Feed
            </NavLink>
          </nav>
          <div className="clearfix" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
