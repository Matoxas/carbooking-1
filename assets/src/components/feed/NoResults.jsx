import React, { Component } from "react";
import SearchIllustation from "./extras/404";
import ReminderModal from "./reminderModal";
import "./feed.css";

class NoResults extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", modalIsOpen: false };
  }

  handleSubmit = () => {
    console.log("submited");
  };

  handleClickOpen = () => {
    this.setState({ modalIsOpen: true });
  };

  handleClose = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="feed-error">
        <div className="feed-error-illustation">
          <SearchIllustation className="searchIllustration" />
        </div>
        <div className="feed-error-text">
          <h4 className="feed-error-text feed-error-text--title">
            Deja, nėra ką rodyti :(
          </h4>
          <h5 className="feed-error-text feed-error-text--description">
            Galite pabandyti kitą paiešką, arba
            <span className="semi-bold-text">
              užsisakykite priminimą el. paštu!
            </span>
          </h5>
          <button onClick={this.handleClickOpen} className="submit-button">
            Užsakyti
          </button>
          <ReminderModal
            open={this.state.modalIsOpen}
            handleClose={this.handleClose}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default NoResults;
