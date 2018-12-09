import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

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

class AlertDialog extends React.Component {

    constructor() {
        super();
        this.state = {
            open: true,
        }
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        if (this.props.alertMessage != undefined) {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{this.props.alertHeader}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {this.props.alertMessage}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary" autoFocus>
                                    Uždaryti langą
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </MuiThemeProvider>
                </div>
            );
        } else {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Rezervuoti nepavyko</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Turite užpildyti visus laukus ir pasirinkti datas
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary" autoFocus>
                                    Uždaryti langą
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </MuiThemeProvider>
                </div>
            );
        }
    }
}

export default AlertDialog;