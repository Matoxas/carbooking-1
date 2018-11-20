import React, {Component} from 'react';

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
                            latitude={car.latitude}
                            longitude={car.longitude}
                            zoom={16}/>
                    </div>
                </div>
            )
        }
    }
}

export default CarListing;