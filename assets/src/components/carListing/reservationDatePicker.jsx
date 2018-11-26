import React, {Component} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-day-picker/lib/style.css";
import "./carListing.css";
// registerLocale("lt", lt);
import moment from "moment";
import {inject, observer} from "mobx-react";
// import lt from "date-fns/locale/lt";

@inject("CarStore")
@observer
export default class reservationDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date_from: new Date(),
            date_until: moment(this.startDate)
                .add(7, "d")
                .toDate(),
        };
    }

    handleSubmit = e => {
        e.preventDefault();
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
            <div>
                <DatePicker
                    className="input--stretch"
                    // locale={"lt"}
                    selected={this.state.date_from}
                    onChange={this.handleFromChange}
                />
            </div>
        );
    }
}
