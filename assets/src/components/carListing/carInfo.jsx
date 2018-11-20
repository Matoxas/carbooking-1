import React from 'react';
import './carListing.css';
import ReservationDatePicker from './reservationDatePicker';

const carInfo = (props) => {
    return (
        <div className="info">
            <h1 className="info__name">{props.car.brand} {props.car.model}</h1>
            <br/>
            <div className="row info__details">
                <div className="col-xl-6 text-muted">Paros kaina</div>
                <div className="col-xl-6">€ {props.car.price}</div>
                <div className="col-xl-6 text-muted">Vieta</div>
                <div className="col-xl-6">{props.car.city}</div>
                <div className="col-xl-6 text-muted">Telefono nr.</div>
                <div className="col-xl-6 info__details-small">{props.car.phone}</div>
                <div className="col-xl-6 text-muted">El. paštas</div>
                <div className="col-xl-6 info__details-small">{props.car.email}</div>
                <div className="col-xl-12">
                    <br/>
                    <div className="row info__details-small">
                        <div className="col-md-6">
                            <p>Pradžios data</p>
                            <ReservationDatePicker/>
                        </div>
                        <div className="col-md-6">
                            <p>Pabaigos data</p>
                            <ReservationDatePicker/>
                        </div>
                    </div>
                    <br/>
                    <h3>Aprašymas</h3>
                    <div className="info__comments">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                        cumque
                        delectus et nihil repellat
                        voluptate? A ad adipisci debitis expedita fuga illo modi, odio omnis quis reiciendis similique
                        sunt
                        velit?
                    </div>
                </div>
            </div>
        </div>
    )
};

export default carInfo;