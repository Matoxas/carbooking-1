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
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  onSubmit = () => {
    this.child.formSubmit();
  };

  onDelete = () => {
    this.child.onDeleteCar();
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          fullScreen
          open={true}
          onClose={this.props.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="secondary"
                onClick={this.props.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="secondary"
                className={classes.flex}
              >
                <span className="d-none d-sm-block">
                  {` ${this.props.editableCar.brand} ${
                    this.props.editableCar.model
                  } `}
                </span>
              </Typography>
              <Button color="secondary" onClick={this.props.handleUndo}>
                Anuliuoti pakeitimus
              </Button>
              <Button color="secondary" onClick={this.onDelete}>
                Noriu ištrinti
              </Button>
              <Button color="secondary" onClick={this.onSubmit}>
                Išsaugoti
              </Button>
            </Toolbar>
          </AppBar>
          <div className="main-wrapper">
            <DialogContent>
              <div className="main newCarWrapper mb-5 mt-0">
                <EditCarForm
                  closeForm={this.props.handleClose}
                  onRef={ref => (this.child = ref)}
                />
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
