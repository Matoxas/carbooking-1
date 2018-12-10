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
import baseUrl from "../../rootConfig";
axios.defaults.baseURL = baseUrl;

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

@inject("CarStore")
@observer
class reminderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {
        email: ""
      }
    };
  }

  sendFormToApi = () => {
    const { filters } = this.props.CarStore;
    const result = {
      email: this.state.email,
      filters
    };

    axios
      .post("/api/new/subscribe", result)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSubmit = () => {
    if (Validators.email(this.state.email, this.updateErrors)) {
      this.sendFormToApi();
    }
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
          onClose={this.props.handleClose}
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
          <DialogActions>
            <Button onClick={this.props.handleClose} color="secondary">
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
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default reminderModal;
