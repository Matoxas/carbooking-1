import React, { Component } from 'react';
import './carListing.css';
import DatePicker from "react-datepicker/es";
import {inject, observer} from "mobx-react";

@inject("CarStore")
@observer
class carInfo extends Component {
    constructor() {
        super();
        this.state = {
            date_from: new Date(),
            date_until: new Date(),
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { postReservation } = this.props.CarStore;
        const { date_from, date_until } = this.state;

        const reservation = {
            id: this.props.car.id,
            date_from: date_from,
            date_until: date_until,
        };

        postReservation(reservation);
    };

    handleFromChange = date => {
        this.setState({
            date_from: date
        });
    };

    handleUntilChange = date => {
        this.setState({
            date_until: date
        });
    };

    render() {
        return (
            <div className="info">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="row">
                            <div className="col-sm-3 info-description">
                            </div>
                            <div className="col-sm-9">
                                <p className="info--big">{this.props.car.brand} {this.props.car.model}</p>
                            </div>
                            <div className="col-sm-3 info-description">
                                Vieta
                            </div>
                            <div className="col-sm-9">
                                <p className="info--normal">{this.props.car.city}</p>
                            </div>
                            <div className="col-sm-3 info-description">
                                Aprašymas
                            </div>
                            <div className="col-sm-9">
                                <p className="info--normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                            <hr/>
                            <div className="col-sm-3 info-description">
                                Savininkas
                            </div>
                            <div className="col-sm-9">
                                <p className="info--normal">
                                    <i className="far fa-envelope"></i>
                                    {this.props.car.email}
                                </p>
                                <p className="info--normal">
                                    <i className="fas fa-phone"></i>
                                    {this.props.car.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 info-price">
                        <span className="info-price--currency">€</span>
                        <span className="info-price--value">{this.props.car.price}</span>
                        <span className="info-price--small">dienai</span>
                        <div className="info-dates">
                            <div className="info--relative">
                                <p className="info-p">Pradžios data</p>
                                <div>
                                    <DatePicker
                                        className="input--stretch"
                                        // locale={"lt"}
                                        selected={this.state.date_from}
                                        onChange={this.handleFromChange}
                                    />
                                </div>
                            </div>
                            <div className="info--relative">
                                <p className="info-p">Pabaigos data</p>
                                <div>
                                    <DatePicker
                                        className="input--stretch"
                                        // locale={"lt"}
                                        selected={this.state.date_until}
                                        onChange={this.handleUntilChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={this.handleSubmit} className="btn btn-warning info-button">Rezervuoti</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default carInfo;