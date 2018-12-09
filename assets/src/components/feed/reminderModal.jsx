import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./feed.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      light: "#fee7de",
      main: "#f47e60",
      dark: "#f47e60"
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#999"
    }
  }
});

const reminderModal = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Priminimas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Gausite priminimą el. paštu, kai tik kas nors įkels skelbimą
            atitinkatį jūsų paskutinės paieškos parametrus.
          </DialogContentText>
          <div className="modal-form mt-2">
            <label
              className="col-sm-3 col-md-2 modal-label"
              htmlFor="inputState"
            >
              El.paštas:
            </label>
            <div className="col-sm-9 col-md-10">
              <input
                name="email"
                type="email"
                className="modal-input"
                placeholder="pavyzdys@mail.lt"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">
            Atšaukti
          </Button>
          <Button onClick={props.handleSubmit} color="primary">
            Patvirtinti
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default reminderModal;
