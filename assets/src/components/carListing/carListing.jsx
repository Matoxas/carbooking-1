import React, {Component} from 'react';
import Geocode from 'react-geocode';

import CarInfo from './carInfo';
import CarImage from './carImage';
import MapContainer from '../MapContainer';


import { inject, observer } from "mobx-react";
@inject("CarStore")
@observer
class CarListing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarShowing: false,
            place: null,
            lat: 0,
        }
    }

    getCar() {
        const routeId = this.props.match.params.id;
        const { CarStore } = this.props;
        CarStore.GetCar(routeId);
    };

    ShowCalendar = () => {
        this.setState({showCalendar: true})
    };

    render() {
        const {loading} = this.props.CarStore;

        if (loading) {
            return <h2>loading</h2>
        } else {
            this.getCar();
            const car = this.props.CarStore.currentCar;
            Geocode.setApiKey("AIzaSyDGwf3wXD5z0XqaolwPbRVRKGIkDnK5ql4");

            Geocode.fromAddress(`${car.city}, Lithuania`).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    this.setState({lat: lat,
                        lng: lng});
                },
                error => {
                    console.error(error);
                }
            );
            return (
                <div className="main">
                    <div className="container card">
                        <div className="row">
                            <div className="col-xl-5">
                                <CarInfo car={car}/>
                            </div>
                            <div className="col-xs-7">
                                <CarImage image={car}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <MapContainer
                            lat={this.state.lat}
                            lng={this.state.lng}
                            zoom={16}/>
                    </div>
                </div>
            )
        }
    }
}

export default CarListing;