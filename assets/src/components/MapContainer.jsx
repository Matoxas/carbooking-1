import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import "../style/index.css";

const mapStyles = {
    width: '100%',
    height: '100%',
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
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
                className = "map--size"
                google={this.props.google}
                zoom={this.props.zoom}
                style={mapStyles}
                initialCenter={{ lat: this.props.latitude, lng: this.props.longitude}}
                >
                <Marker
                    onClick={this.onMarkerClick}
                    label="1"
                    // icon={{
                    //     url: "https://shelta.com.au/wp-content/uploads/maps/map-marker-shade.png",
                    //     scaledSize: new google.maps.Size(60,30.26),
                    // }}
                    />
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

export default GoogleApiWrapper(
    (props) => ({
            apiKey: props.apiKey
        }
    ))(MapContainer)