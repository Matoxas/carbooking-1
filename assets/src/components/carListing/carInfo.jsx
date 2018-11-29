import React, {Component} from 'react';
import './carListing.css';
import DatePicker from "react-datepicker/es";
import {inject, observer} from "mobx-react";

@inject("CarStore")
@observer
class carInfo extends Component {
    constructor() {
        super();
        this.state = {
            reservationClicked: false,
            reservationButtonText: "Reserve",
            date_from: new Date(),
            date_until: new Date(),
            name: "",
            email: "",
            phone: "",
            message: "",
            value: null,
        };
    }

    handleSubmit = e => {
        if (this.state.reservationClicked === true) {
            e.preventDefault();
            const {postReservation} = this.props.CarStore;
            const {name, email, phone, message, date_from, date_until} = this.state;

            const reservation = {
                id: this.props.car.id,
                date_from: date_from,
                date_until: date_until,
                name: name,
                email: email,
                phone: phone,
                message: message,
            };

            postReservation(reservation);

            alert("Jūsų rezervacija išsiųsta savininko patvirtinimui");

            this.setState({
                reservationClicked: false,
                reservationButtonText: "Reserve",
            });
        } else {
            this.setState({
                reservationClicked: true,
                reservationButtonText: "Submit reservation",
            });
        }
    };

    handleFromChange = date => {
        this.setState({date_from: date})
    };

    handleUntilChange = date => {
        this.setState({date_until: date})
    };

    handleNameChange = name => {
        this.setState({name: name.target.value})
    };

    handleMessageChange = message => {
        this.setState({message: message.target.value})
    };

    handleEmailChange = email => {
        this.setState({email: email.target.value})
    };

    handlePhoneChange = phone => {
        this.setState({phone: phone.target.value})
    };

    render() {
        // if (this.state.reservationClicked === true) {
        //     return <Redirect to='/feed' />
        // }

        return (
            <div className="info">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg-4 info-description">
                            </div>
                            <div className="col-lg-8">
                                <p className="info--big">{this.props.car.brand} {this.props.car.model}</p>
                            </div>
                            <div className="col-lg-4 info-description">
                                Vieta
                            </div>
                            <div className="col-lg-8">
                                <p className="info--normal">{this.props.car.city}</p>
                            </div>
                            <div className="col-lg-4 info-description">
                                Aprašymas
                            </div>
                            <div className="col-lg-8">
                                <p className="info--normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                            <hr/>
                            <div className="col-lg-4 info-description">
                                Savininkas
                            </div>
                            <div className="col-lg-8">
                                <p className="info--normal info--owner">
                                    <i className="far fa-envelope info--envelope"/>
                                    {this.props.car.email}
                                </p>
                                <p className="info--normal info--owner info--owner-raise">
                                    <i className="fas fa-phone info--envelope"/>
                                    {this.props.car.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 info-price">
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
                            <button onClick={this.handleSubmit} className="btn btn-warning info-button"
                                    data-toggle="collapse" data-target="#collapseExample" aria-expanded="false"
                                    aria-controls="collapseExample">
                                {this.state.reservationButtonText}
                            </button>
                        </div>
                        <div>
                            <div className="form-group collapse form-group-separate" id="collapseExample">
                                <input onChange={this.handleNameChange} className="form-control" type="text"
                                       placeholder="Įrašykite savo vardą"/>
                                <input onChange={this.handleEmailChange} className="form-control" type="text"
                                       placeholder="Įrašykite savo el. paštą"/>
                                <input onChange={this.handlePhoneChange} className="form-control" type="text"
                                       placeholder="Įrašykite savo tel. numerį"/>
                                <div className="form-group">
                                    <textarea onChange={this.handleMessageChange} className="form-control" type="text"
                                              placeholder="Žinutė savininkui..."/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default carInfo;