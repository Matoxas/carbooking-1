import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
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
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{ lat: 54.6871555, lng: 25.279651400000034 }}
                >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Vilniaus mieste esancios masinos'}
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