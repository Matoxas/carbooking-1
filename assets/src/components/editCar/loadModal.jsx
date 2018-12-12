import React from "react";
import Loading from "../loading";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const spinnerWrapper = {
  maxHeight: "200px",
  marginTOp: "2vw",
  height: "150px",
  maxWidth: "400px",
  marginTop: "2vw",
  minWidth: "200px"
};

const spinnerSize = {
  height: "100%",
  width: "auto"
};

const loadModal = props => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <div style={spinnerWrapper} className="flex modal-load flex-center">
          <Loading style={spinnerSize} className={"loading"} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default loadModal;
