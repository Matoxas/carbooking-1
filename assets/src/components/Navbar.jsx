import React from "react";
import { NavLink } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
  return (
    <div className="container">
      <header className="masthead mb-auto padding-top text-center margin-bottom">
        <div className="inner">
          <img src="images/logo.svg" className="masthead-brand" alt="CarBooking" />
          <nav className="nav nav-masthead justify-content-center">
            <NavLink to="/" exact={true} className="nav-link">
              Pagrindinis
            </NavLink>
            <NavLink to="/feed" className="nav-link">
              Feed
            </NavLink>
              <NavLink to="/carListing" className="nav-link">
                  Car Listing
              </NavLink>
          </nav>
          <div className="clearfix" />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
