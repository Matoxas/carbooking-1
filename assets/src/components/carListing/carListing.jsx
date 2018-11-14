import React, {Component} from 'react';

import CarInfo from './carInfo';
import CarImage from './carImage';
import ReservationDatePicker from './reservationDatePicker';

import { inject, observer } from "mobx-react";
@inject("CarStore")
@observer
class CarListing extends Component {
    constructor() {
        super();

        this.state = {
            calendarShowing: false
        }
    }

    componentDidMount() {
        const routeId = this.props.match.params.id;
        const { CarStore } = this.props;
        CarStore.GetCar(routeId);
    }

    ShowCalendar = () => {
        this.setState({showCalendar: true})
    };

    render() {
            const car = this.props.CarStore.currentCar;
        return (
            <div className="main">
                <div className="container card">
                    <div className="row">
                        <div className="col-xl-5">
                            <CarInfo car = {car}/>
                        </div>
                        <div className="col-xs-7">
                            <CarImage/>
                        </div>
                    </div>
                    <div>
                        <div className="reservation--center">
                            <button onClick={() => this.ShowCalendar()} className="btn btn-secondary">
                                Select date from
                            </button>
                            {this.state.showCalendar ? <ReservationDatePicker/> : null }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CarListing;