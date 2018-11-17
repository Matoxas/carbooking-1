import React from "react";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <div>
      <div className="main-navigation">
        <NavLink to="/feed" className="nav-link--main">
          Visi
        </NavLink>
        <NavLink to="/Favourites" className="nav-link--main">
          Mėgstamiausi
        </NavLink>
        <NavLink to="/Map" className="nav-link--main">
          Žemėlapis
        </NavLink>
      </div>
      <hr />
    </div>
  );
};

export default MainNavigation;
