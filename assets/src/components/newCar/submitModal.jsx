import React, { Component } from "react";
import Lottie from "react-lottie";
import Loading from "../loading";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import success from "../../extras/checked_done_.json";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
// import success from "./success_animation.json";

const theme = createMuiTheme({
  palette: {
    useNextVariants: true,
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

const marginTop = {
  marginTop: "2vw"
};

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: success,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class SubmitModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
      isPaused: false
    };
  }

  render() {
    const { formStatus } = this.props;

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Dialog
            open={this.props.open}
            onClose={this.props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {formStatus == "PENDING" && "Reikia patvirtinimo!"}
              {formStatus == "LOADING" && "Palaukite, sekelbimas įkeliamas..."}
              {formStatus == "SUCCESS" &&
                "Sveikiname, skelbimas sėkmingai įkeltas!"}
              {formStatus == "FAILURE" && "Deja, kažkas ne taip!"}
            </DialogTitle>
            <DialogContent>
              {formStatus == "PENDING" && (
                <DialogContentText id="alert-dialog-description">
                  Ar patvirtinate, kad jūsų įrašyti duomenys yra teisingi ir
                  sutinkate pateiktą informaciją skelbti viešai?
                </DialogContentText>
              )}
              {formStatus == "LOADING" && (
                <div
                  style={spinnerWrapper}
                  className="flex modal-load flex-center"
                >
                  <Loading style={spinnerSize} className={"loading"} />
                </div>
              )}

              {formStatus == "SUCCESS" && (
                // <DialogContentText id="alert-dialog-description">
                //   Dabar galite peržiūrėti savo skelbimą, arba grįžti ir nuomoti
                //   automobilį kitomis dienomis.
                // </DialogContentText>
                <div
                  style={{ ...spinnerWrapper, ...marginTop }}
                  className="flex flex-center"
                >
                  <Lottie
                    options={defaultOptions}
                    height={"100%"}
                    width={"auto"}
                    isStopped={this.state.isStopped}
                    isPaused={this.state.isPaused}
                  />
                </div>
              )}

              {formStatus == "FAILURE" && (
                <DialogContentText id="alert-dialog-description">
                  Panašu, kad įkeliant automobilį įvyko klaida, patikrinkite ar
                  teisingai įvedėte visus duomenis ir bandykite vėl.
                </DialogContentText>
              )}
            </DialogContent>

            {formStatus == "PENDING" && (
              <DialogActions>
                <Button onClick={this.props.onClose} color="secondary">
                  Atšaukti
                </Button>
                <Button
                  onClick={this.props.formSubmit}
                  color="primary"
                  autoFocus
                >
                  Sutinku
                </Button>
              </DialogActions>
            )}

            {formStatus == "SUCCESS" && (
              <DialogActions>
                <Button onClick={this.props.onClose} color="secondary">
                  Grįžti
                </Button>
                <Link to={`/feed/carListing/${this.props.carId}`}>
                  <Button color="primary" autoFocus>
                    Peržiūrėti skelbimą
                  </Button>
                </Link>
              </DialogActions>
            )}
            {formStatus == "FAILURE" && (
              <DialogActions>
                <Button
                  onClick={() => this.props.onClose("PENDING")}
                  color="secondary"
                >
                  Grįžti
                </Button>
              </DialogActions>
            )}
          </Dialog>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default SubmitModal;
