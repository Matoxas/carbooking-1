import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "./feed.css";
import Validators from "../newCar/formValidators";
import axios from "axios";
import { inject, observer } from "mobx-react";
import success from "../../extras/checked_done_.json";

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

const spinnerWrapper = {
  maxHeight: "200px",
  marginTOp: "2vw",
  height: "150px",
  maxWidth: "400px",
  marginTop: "2vw",
  minWidth: "200px"
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

@inject("CarStore")
@observer
class reminderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {
        email: ""
      },
      status: "PENDING"
    };
  }

  sendFormToApi = () => {
    const { filters } = this.props.CarStore;
    const result = {
      email: this.state.email,
      filters
    };

    axios
      .post("/new/subscribe", result)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setStatus("SUCCESS");
        } else {
          this.setStatus("FAILURE");
        }
      })
      .catch(error => {
        this.setStatus("FAILURE");
      });
  };

  setStatus = status => {
    this.setState({
      status: status
    });
  };

  handleSubmit = () => {
    if (Validators.email(this.state.email, this.updateErrors)) {
      this.sendFormToApi();
    }
  };

  handleClose = () => {
    this.setStatus("PENDING");
    this.setState({
      email: ""
    });
    this.props.handleClose();
  };

  setValues = e => {
    this.updateErrors({ [e.target.name]: "" });
    const data = this.state;
    data[e.target.name] = e.target.value;
    this.setState({
      ...data,
      errors: {
        ...this.state.errors,
        [e.target.name]: ""
      }
    });
  };

  updateErrors = errors => {
    this.setState({ errors: { ...errors } });
  };

  doesFormHasErrors = () => {
    return !Object.values(this.state.errors).every(error => error == "");
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {/*  MODAL TITLE */}
          {this.state.status == "PENDING" && (
            <DialogTitle id="form-dialog-title">Priminimas</DialogTitle>
          )}
          {this.state.status == "SUCCESS" && (
            <DialogTitle id="form-dialog-title">Atlikta</DialogTitle>
          )}
          {this.state.status == "FAILURE" && (
            <DialogTitle id="form-dialog-title">
              Deja, kažkas ne taip
            </DialogTitle>
          )}

          {/*  MODAL CONTENT */}

          {this.state.status == "PENDING" && (
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
                    onChange={this.setValues}
                    name="email"
                    type="email"
                    className={
                      (this.doesFormHasErrors() ? "invalid-input" : "") +
                      " modal-input"
                    }
                    placeholder="pavyzdys@mail.lt"
                  />
                  {this.doesFormHasErrors() && (
                    <span className="invalid-feedback">
                      {this.state.errors.email}
                    </span>
                  )}
                </div>
              </div>
            </DialogContent>
          )}

          {this.state.status == "SUCCESS" && (
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

          {this.state.status == "FAILURE" && (
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Įvyko kažkas netikėto... Pabandykite veliau.
              </DialogContentText>
            </DialogContent>
          )}

          {/*  MODAL ACTIONS */}

          {this.state.status == "PENDING" && (
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Atšaukti
              </Button>
              <Button
                disabled={this.doesFormHasErrors()}
                onClick={this.handleSubmit}
                color="primary"
              >
                Patvirtinti
              </Button>
            </DialogActions>
          )}

          {(this.state.status == "SUCCESS" ||
            this.state.status == "FAILURE") && (
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Uždaryti
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default reminderModal;
