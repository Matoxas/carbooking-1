import React from "react";
import PropTypes from "prop-types";
import MarkerStyled from "./MarkerStyled";
import MarkerInGroupStyled from "./MarkerInGroupStyled";
import PopUp from "./popup";
import history from "../../../history";
import "./popup.css";
const imgStyle = {
  height: "100%",
  width: "auto",
  margin: "0"
};

class Marker extends React.PureComponent {
 constructor(){
  super();
  this.state = {
    showPopUp : false
  }
 }


  static defaultProps = {
    inGroup: false
  };

  handleClick = () => {
    if (this.props.id) {
      history.push("/feed/carListing/" + this.props.id);
    }
  };

  handleMouseOver = () => {
    if (this.props.id) {
      this.setState({
        showPopUp: true
      })
    } 
  };

  handleMouseLeave = () => {
    this.setState({
      showPopUp: false
    })
  };

  render() {
    return (
      // <div>

      <div
        className={ "relative "+(this.state.showPopUp ? "hovered" : "")}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        <PopUp showPopUp={this.state.showPopUp} data={this.props} />
        {this.props.inGroup ? (
          <MarkerInGroupStyled>
            <img style={imgStyle} src={this.props.image} alt="img" />
          </MarkerInGroupStyled>
        ) : (
          <MarkerStyled>
            <img style={imgStyle} src={this.props.image} alt="img" />
          </MarkerStyled>
        )}
      </div>
      // </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool,
  image: PropTypes.string
};

export default Marker;
