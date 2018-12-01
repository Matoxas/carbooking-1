import React from "react";
import Dropzone from "react-dropzone";

const Uploader = props => {
  //   const allowDrop = dropable ? disableClick : "";

  return (
    <Dropzone
      disableClick={props.disableClick}
      className={props.className}
      activeClassName="dropzone--active"
      accept="image/jpeg, image/png"
      onDrop={props.onDrop}
    >
      {props.children}
    </Dropzone>
  );
};

export default Uploader;
