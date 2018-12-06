import Loading from "../loading";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const spinnerSize = {
  height: "30vh",
  width: "30vw"
};

const SubmitModal = props => {
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="text-center" id="alert-dialog-title">
          {props.formStatus == "PENDING" && "Reikia patvirtinimo!"}
          {props.formStatus == "LOADING" &&
            "Palaukite, sekelbimas įkeliamas..."}
        </DialogTitle>
        <DialogContent>
          {props.formStatus == "LOADING" && (
            <div style={spinnerSize} className="flex flex-center">
              <Loading className={"loading"} />
            </div>
          )}

          {props.formStatus == "PENDING" && (
            <DialogContentText id="alert-dialog-description">
              Ar patvirtinate, kad jūsų įrašyti duomenys yra teisingi ir
              sutinkate pateiktą informaciją skelbti viešai?
            </DialogContentText>
          )}
        </DialogContent>

        {props.formStatus == "PENDING" && (
          <DialogActions>
            <Button onClick={props.onClose} color="primary">
              Atšaukti
            </Button>
            <Button onClick={props.formSubmit} color="primary" autoFocus>
              Sutinku
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default SubmitModal;
