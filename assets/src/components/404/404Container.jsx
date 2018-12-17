import React from "react";
import ItemNotFound from "./404logo";

const Container = () => {
  return (
    <div className="main itemNotFoundContainer">
      <div className="container">
          <div className="row">
              <div className="col-xl-3"/>
              <div className="col-xl-6">
                  <ItemNotFound />
              </div>
              <div className="col-xl-3"/>
          </div>
      </div>
    </div>
  );
};

export default Container;
