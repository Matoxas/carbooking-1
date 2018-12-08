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
        zoom={7}
        style={mapStyles}
        initialCenter={{ lat: 54.6871555, lng: 25.279651400000034 }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={"Vilniaus mieste esancios masinos"}
        />
        <Marker
          title={"The marker`s title will appear as a tooltip."}
          name={"SOMA"}
          position={{ lat: 54.8985207, lng: 23.90359650000005 }}
        />
        <Marker
          name={"Dolores park"}
          position={{ lat: 55.9349085, lng: 23.313682299999982 }}
        />
        <Marker />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: props.apiKey
}))(MapContainer);
