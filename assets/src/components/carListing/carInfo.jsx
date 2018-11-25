import React from 'react';
import './carListing.css';
import ReservationDatePicker from './reservationDatePicker';

const carInfo = (props) => {
    return (
        <div className="info">
            <div className="row">
                <div className="col-sm-8">
                    <div className="row">
                        <div className="col-sm-4 info-description">
                            Automobilis
                        </div>
                        <div className="col-sm-8">
                            <p className="info--normal">{props.car.brand}</p>
                            <p className="info--big">{props.car.model}</p>
                        </div>
                        <div className="col-sm-4 info-description">
                            Vieta
                        </div>
                        <div className="col-sm-8">
                            <p className="info--normal">{props.car.city}</p>
                        </div>
                        <div className="col-sm-4 info-description">
                            Aprašymas
                        </div>
                        <div className="col-sm-8">
                            <p className="info--normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </p>
                        </div>
                        <div className="col-sm-4 info-description">
                            Savininkas
                        </div>
                        <div className="col-sm-8">
                            <p className="info--normal">
                                <img
                                    className="info-icon"
                                    src="https://www.clipartmax.com/png/middle/35-351662_update-to-our-address-email-icon-png.png"
                                    width="20"
                                    height="20"
                                    alt=""/>
                                {props.car.email}
                            </p>
                            <p className="info--normal">
                                <img
                                    className="info-icon"
                                    src="https://cdn0.iconfinder.com/data/icons/office-business-13/512/OFFICE_BUSINESS-17-512.png"
                                    width="20"
                                    height="20"
                                    alt=""/>
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
                        <button className="btn btn-success info-button">Rezervuoti</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default carInfo;