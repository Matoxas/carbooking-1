import React from "react";
import "../style/index.css";
import { Link } from "react-router-dom";
import Logo from "./logo";
const Index = () => {
  return (
    <div className="container padding-top">
      <div className="flex flex-center fullHeight text-center padding-bottom--big">
        <h2>Čia bus laukas</h2>
        <Link to="/feed" className="scroll-down" />
      </div>
    </div>
  );
};

export default Index;
