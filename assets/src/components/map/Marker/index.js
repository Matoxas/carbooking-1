import React from 'react';
import PropTypes from 'prop-types';
import MarkerStyled from './MarkerStyled';
import MarkerInGroupStyled from './MarkerInGroupStyled';
import MyGreatPlaceWithControllableHover from './popup';
import history from "../../../history";
const imgStyle = {

    height: "100%",
    width: "auto",
    margin: "0"
}

class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false,
  };

  handleClick = () =>{

    if (this.props.id){
      history.push("/feed/carListing/"+this.props.id);
    }
  }

  render() {
    return (
      // <div>
      // <MyGreatPlaceWithControllableHover/>
      <div onClick={this.handleClick}>
        {this.props.inGroup
          ? <MarkerInGroupStyled>
             <img style={imgStyle} src={this.props.image} alt="img"/>
            </MarkerInGroupStyled>
          : <MarkerStyled>
              <img style={imgStyle} src={this.props.image} alt="img"/>
            </MarkerStyled>}
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
