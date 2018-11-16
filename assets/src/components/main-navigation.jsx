import React from "react";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <div>
      <div className="main-navigation">
        <NavLink to="/feed" className="nav-link">
          Visi
        </NavLink>
        <NavLink to="/" className="nav-link">
          Mėgstamiausi
        </NavLink>
        <NavLink to="/" className="nav-link">
          Žemėlapis
        </NavLink>
      </div>
      <hr />
    </div>
  );
};

export default MainNavigation;
