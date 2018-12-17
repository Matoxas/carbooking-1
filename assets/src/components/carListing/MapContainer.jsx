import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import "../../style/index.css";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  constructor(props) {
    super(props);
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        className="map--size"
        google={this.props.google}
        zoom={this.props.zoom}
        style={mapStyles}
        initialCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
        scrollwheel={false}
        maxZoom={15}
        minZoom={15}
        disableDefaultUI={true}
      >
        <Marker
          onClick={this.onMarkerClick}
          icon={{
            url:
              "https://www.logolynx.com/images/logolynx/f6/f6999054e09462b3f267ef4bf7b8c47e.png",
            scaledSize: new google.maps.Size(160, 160)
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: "AIzaSyDGwf3wXD5z0XqaolwPbRVRKGIkDnK5ql4"
}))(MapContainer);
