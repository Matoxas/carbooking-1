import React from "react";
import ItemNotFound from "./404logo";

const Container = () => {
  return (
    <div>
      <div className="main itemNotFoundContainer">
        <div className="container">
          <ItemNotFound />
        </div>
      </div>
    </div>
  );
};

export default Container;
