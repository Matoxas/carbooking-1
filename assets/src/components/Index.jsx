import React from "react";
import "../style/index.css";
import Map from './Map';

const Index = () => {
  return (
    <div className="container-fluid padding-top">
      <div className="flex flex-center fullHeight text-center">
        <h2>Čia bus pagrindinis paieškos laukas</h2>
      </div>
        <Map/>
    </div>
  );
};

export default Index;
