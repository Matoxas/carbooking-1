import React from 'react';
import './carListing.css';
import ReservationDatePicker from './reservationDatePicker';

const carInfo = (props) => {
    return (
        <div className="info">
            <div className="row">
                <div className="col-sm-8">
                    <div className="row">
                        <div className="col-sm-3 info-description">
                        </div>
                        <div className="col-sm-9">
                            <p className="info--big">{props.car.brand} {props.car.model}</p>
                        </div>
                        <div className="col-sm-3 info-description">
                            Vieta
                        </div>
                        <div className="col-sm-9">
                            <p className="info--normal">{props.car.city}</p>
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
                                {props.car.email}
                            </p>
                            <p className="info--normal">
                                <i className="fas fa-phone"></i>
                                {props.car.phone}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 info-price">
                    <span className="info-price--currency">€</span>
                    <span className="info-price--value">{props.car.price}</span>
                    <span className="info-price--small">dienai</span>
                    <div className="info-dates">
                        <div className="info--relative">
                            <p className="info-p">Pradžios data</p>
                            <ReservationDatePicker/>
                        </div>
                        <div className="info--relative">
                            <p className="info-p">Pabaigos data</p>
                            <ReservationDatePicker/>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-warning info-button">Rezervuoti</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default carInfo;