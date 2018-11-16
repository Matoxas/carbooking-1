import React from 'react';
import './carListing.css';

const carInfo = (props) => {
    return (
        <div className="info">
            <h1 className="info__name">{props.car.brand} {props.car.model}</h1>
            <br/>
            <div className="row info__details">
                <div className="col-xl-6 text-muted">Paros cia</div>
                <div className="col-xl-6">€ {props.car.price}</div>
                <div className="col-xl-6 text-muted">Vieta</div>
                <div className="col-xl-6">{props.car.city}</div>
                <div className="col-xl-6 text-muted">Telefono nr.</div>
                <div className="col-xl-6 info__details-small">{props.car.phone}</div>
                <div className="col-xl-6 text-muted">El pastas</div>
                <div className="col-xl-6 info__details-small">{props.car.email}</div>
                <div className="col-xl-12">
                <br/>
                <h3>Komentarai</h3>
                <div className="info__comments">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque
                    delectus et nihil repellat
                    voluptate? A ad adipisci debitis expedita fuga illo modi, odio omnis quis reiciendis similique sunt
                    velit?
                </div>
            </div>
            </div>
        </div>
    )
};

export default carInfo;