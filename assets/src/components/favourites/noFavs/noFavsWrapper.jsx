import React from "react";
import NoFavsLogo from "./noFavsLogo";
import "./noFavs.css";

const noFavsWrapper = () => {
  return (
    <div className="noFavs text-center">
      <h2>Mėgstamiausi automobiliai atsiras čia</h2>
      <h4 className="color-primary">
        pažymėk spausdamas širdelę ant patinkančio automobilio
      </h4>
      <NoFavsLogo />
    </div>
  );
};

export default noFavsWrapper;
