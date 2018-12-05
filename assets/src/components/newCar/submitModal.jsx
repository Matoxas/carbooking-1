import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const SubmitModal = props => {
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reikia patvirtinimo!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ar patvirtinate, kad jūsų įrašyti duomenys yra teisingi ir sutinkate
            pateiktą informaciją skelbti viešai?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Atšaukti
          </Button>
          <Button onClick={props.formSubmit} color="primary" autoFocus>
            Sutinku
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SubmitModal;
