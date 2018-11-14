import React from 'react';
import Calendar from "react-calendar";

const reservationDatePicker = () => {
    return (
        <div>
            <Calendar className="reservation--center" format='DD/MM/YYYY' date='4-12-2014' />
            <div>
                <button className="btn btn-primary">Rezervuoti</button>
            </div>
        </div>
    )
};

export default reservationDatePicker;