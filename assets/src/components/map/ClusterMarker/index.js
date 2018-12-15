import React from "react";
import PropTypes from "prop-types";
import { List } from "immutable";
import Marker from "../Marker";
import MarkerGroup from "./MarkerGroup";
import MarkerCounter from "./MarkerCounter";
import PopUp from "../Marker/popup";


class ClusterMarker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    clusterFaceMarkers: this.props.points.slice(0, 2),
    showPopUp : false
  };

  handleMouseOver = () => {
      this.setState({
        showPopUp: true
      })
  };

  handleMouseLeave = () => {
    this.setState({
      showPopUp: false
    })
  };

  calculateMinMaxPrice = () =>{
    const arrayOfPrices =this.props.points.map( point=> Number(point.price))
    const minPrice = Math.min(...arrayOfPrices);
    const maxPrice = Math.max(...arrayOfPrices);
    return (`${minPrice} € - ${maxPrice} €`)
  }

  render() {
    return (
      <div className="relative">
      <PopUp showPopUp={this.state.showPopUp} priceRange={this.calculateMinMaxPrice()} />
      <MarkerGroup 
      onClick={this.props.zoomIn}
      onMouseOver={this.handleMouseOver} 
      onMouseLeave={this.handleMouseLeave}
      length={this.props.points.length}
      >
        {this.state.clusterFaceMarkers.map(marker => (
          <Marker
            key={marker.id}
            lat={marker.lat}
            image={marker.image}
            lng={marker.lng}
            price={marker.price}
            name={marker.name}
            points={this.props.points}
            inGroup
          />
        ))}
        {this.props.points.length > 2 && (
          <MarkerCounter>+{this.props.points.length - 2}</MarkerCounter>
        )}
      </MarkerGroup>
      </div>
    );
  }
}

ClusterMarker.propTypes = {
  points: PropTypes.array,
  users: PropTypes.instanceOf(List),
  selected: PropTypes.bool
};

export default ClusterMarker;
