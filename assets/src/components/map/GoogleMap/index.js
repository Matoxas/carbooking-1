import React from "react";
import GoogleMapReact from "google-map-react";
import supercluster from "points-cluster";
import Marker from "../Marker";
import ClusterMarker from "../ClusterMarker";
import { inject, observer } from "mobx-react";
import MapWrapper from "./MapWrapper";
import { Component } from "react";
import { observe } from "mobx";

const MAP = {
  defaultZoom: 8,
  defaultCenter: { lat: 54.687157, lng: 25.279652 },
  options: {
    maxZoom: 15
  }
};

@inject("CarStore")
@observer
class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapOptions: {
        center: MAP.defaultCenter,
        zoom: MAP.defaultZoom
      },
      clusters: []
    };

    observe(this.props.CarStore, change => {
      if (change.name == "cars") {
        let mapOptions = this.state.mapOptions;

        if (change.object[change.name].length > 0) {
          const zoom = change.object[change.name].length == 1 ? 11 : 8;

          mapOptions = {
            ...mapOptions,
            center: {
              lat: change.object[change.name][0].latitude,
              lng: change.object[change.name][0].longitude
            },
            zoom
          };
        }
        this.handleMapChange(mapOptions);
      }
    });
  }


  zoomIn = (lat, lng) => {
    const { center: oldCenter, zoom: oldZoom, bounds } = this.state.mapOptions;
    const zoom = oldZoom + 1;
    const center = { lat, lng };
    if (this.state.mapOptions.zoom < MAP.options.maxZoom) {
      this.handleMapChange({ center, zoom, bounds });
    }
  };

  getClusters = () => {
    const { cars } = this.props.CarStore;
    const markersData = cars.map((car, index) => {
      return {
        image: car.images[0],
        name: car.brand + " " + car.model,
        price: car.price,
        id: car.id,
        lat: car.latitude,
        lng: car.longitude
      };
    });

    const clusters = supercluster(markersData, {
      minZoom: 0,
      maxZoom: 30,
      radius: 50
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = props => {
    this.setState({
      clusters: this.getClusters(props).map(
        ({ wx, wy, numPoints, image, price, name, id, points }) => ({
          lat: wy,
          lng: wx,
          image,
          name,
          price,
          numPoints,
          id,
          points
        })
      )
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

  render() {
  
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          options={MAP.options}
          zoom={this.state.mapOptions.zoom}
          center={this.state.mapOptions.center}
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: "AIzaSyAS3ix4rVY4A-T4yPzWlEi766ycl2mY818" }}
        >
          {this.state.clusters.map((item, index) => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  name={item.points[0].name}
                  image={item.points[0].image}
                  key={index}
                  price={item.points[0].price}
                  id={item.points[0].id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                />
              );
            }

            return (
              <ClusterMarker
                key={index}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
                zoomIn={this.zoomIn}
              />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;
