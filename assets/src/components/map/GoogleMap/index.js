import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import Marker from '../Marker';
import ClusterMarker from '../ClusterMarker';
import { inject, observer } from "mobx-react";
import MapWrapper from './MapWrapper';
import { Component } from 'react';


const MAP = {
  defaultZoom: 8,
  defaultCenter: { lat: 54.687157, lng: 25.279652 },
  options: {
    maxZoom: 14,
  },
};

@inject("CarStore")
@observer
export class GoogleMap extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom
    },
    clusters: [],
  };

  getClusters = () => {

    const {cars} = this.props.CarStore;
    const markersData = cars.map((car, index)=>{
      
      return {
        image: car.images[0],
        name: car.brand + " " +car.model,
        id: car.id,
        lat: car.latitude,
        lng: car.longitude
    }
  });

    const clusters = supercluster(markersData, {
      minZoom: 0,
      maxZoom: 10,
      radius: 10,
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = props => {

    this.setState({
      clusters: this.getClusters(props).map(({ wx, wy, numPoints, image, name, id, points }) => ({
            lat: wy,
            lng: wx,
            image,
            name,
            numPoints,
            id,
            points,
          })),
          // center: {
          //   lat: this.getClusters(props)[0].wx,
          //   lng: this.getClusters(props)[0].wy
          // }
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
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
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: 'AIzaSyAS3ix4rVY4A-T4yPzWlEi766ycl2mY818' }}
        >
          {this.state.clusters.map((item, index) => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  name={item.points[0].name}
                  image={item.points[0].image}
                  key={index}
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
                image={item.image}
                points={item.points}
              />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;