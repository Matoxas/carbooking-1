import React from 'react';
// import lt from "date-fns/locale/lt"
import DatePicker, { registerLocale } from "react-datepicker";
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/lt';
import moment from "moment";

export default class reservationDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date_from: new Date(),
            date_until: moment(this.startDate)
                .add(7, "d")
                .toDate(),
            location: ""
        };
    }

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
                    className="input"
                    // locale={"lt"}
                    selected={this.state.date_from}
                    onChange={this.handleFromChange}
                />
            </div>
        );
    }
}