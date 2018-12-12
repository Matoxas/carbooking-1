import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import EditCarForm from "./EditCarForm";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";

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
    error: {
      light: "#fee7de",
      main: "#fee7de"
    },
    secondary: {
      light: "#999",
      main: "#fff"
    }
  }
});

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditCarModal extends React.Component {
  state = {
    open: true
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="secondary"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="secondary"
                className={classes.flex}
              >
                Automobilio redagavimas
              </Typography>
              <Button color="error" onClick={this.handleClose}>
                Noriu ištrinti
              </Button>
              <Button color="secondary" onClick={this.handleClose}>
                Išsaugoti
              </Button>
            </Toolbar>
          </AppBar>
          <div className="main-wrapper">
            <DialogContent>
              <div className="main newCarWrapper mt-0">
                <EditCarForm />
              </div>
            </DialogContent>
          </div>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

EditCarModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditCarModal);
