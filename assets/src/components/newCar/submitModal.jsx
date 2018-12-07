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
  width: "30vw",
  padding: "0 24px 24px"
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
        <DialogTitle id="alert-dialog-title">
          {props.formStatus == "PENDING" && "Reikia patvirtinimo!"}
          {props.formStatus == "LOADING" &&
            "Palaukite, sekelbimas įkeliamas..."}
          {props.formStatus == "SUCCESS" &&
            "Sveikiname, skelbimas sėkmingai įkeltas!"}
          {props.formStatus == "FAILURE" && "Deja, kažkas ne taip!"}
        </DialogTitle>
        <DialogContent>
          {props.formStatus == "PENDING" && (
            <DialogContentText id="alert-dialog-description">
              Ar patvirtinate, kad jūsų įrašyti duomenys yra teisingi ir
              sutinkate pateiktą informaciją skelbti viešai?
            </DialogContentText>
          )}
          {props.formStatus == "LOADING" && (
            <div style={spinnerSize} className="flex flex-center">
              <Loading className={"loading"} />
            </div>
          )}

          {props.formStatus == "SUCCESS" && (
            <DialogContentText id="alert-dialog-description">
              Dabar galite peržiūrėti savo skelbimą, arba grįžti ir nuomoti
              automobilius kitomis dienomis.
            </DialogContentText>
          )}

          {props.formStatus == "FAILURE" && (
            <DialogContentText id="alert-dialog-description">
              Panašu, kad įkeliant automobilį įvyko klaida, patikrinkite ar
              teisingai įvedėte visus duomenis ir bandykite vėl.
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

        {props.formStatus == "SUCCESS" && (
          <DialogActions>
            <Button onClick={props.onClose} color="primary">
              Grįžti
            </Button>
            <Button onClick={props.onClose} color="primary" autoFocus>
              Peržiūrėti skelbimą
            </Button>
          </DialogActions>
        )}
        {props.formStatus == "FAILURE" && (
          <DialogActions>
            <Button onClick={props.onClose} color="primary">
              Grįžti
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default SubmitModal;
