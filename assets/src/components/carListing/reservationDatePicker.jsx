import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/lt';

export default class reservationDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            selectedDay: undefined,
        };
    }
    handleDayChange(day) {
        this.setState({ selectedDay: day });
    }
    render() {
        const { selectedDay } = this.state;
        return (
            <div>
                <DayPickerInput
                    onDayChange={this.handleDayChange}
                    format="LT"
                    placeholder={`${formatDate(new Date(), 'LT', 'lt')}`}
                    dayPickerProps={{
                        locale: 'lt',
                        localeUtils: MomentLocaleUtils,
                    }}
                />
                {/*{selectedDay && <p>Pasirinkta data: {selectedDay.toLocaleDateString()}</p>}*/}
            </div>
        );
    }
}