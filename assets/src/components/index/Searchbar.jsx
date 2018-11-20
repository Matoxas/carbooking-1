import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./searchbar.css";
import lt from "date-fns/locale/lt";
import moment from "moment";
import { inject, observer } from "mobx-react";

registerLocale("lt", lt);
@inject("CarStore")
@observer
class Searchbar extends Component {
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

  componentDidMount() {
    this.props.CarStore.getCities();
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

  hadleCityChange = e => {
    this.setState({
      location: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { setFilters, getAllCars } = this.props.CarStore;
    const { location, date_from, date_until } = this.state;

    setFilters({
      location,
      date_from,
      date_until
    });

    getAllCars();
  };

  render() {
    const { cities } = this.props.CarStore;

    return (
      <form className="searchbar">
        <div className="searchbar-item location">
          <label htmlFor=" location">Miestas:</label>
          <select onChange={this.hadleCityChange}>
            <option value="">Visi</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.city}
              </option>
            ))}
          </select>
        </div>
        <div className="searchbar-item from">
          <label htmlFor="from">Laikas nuo:</label>
          <DatePicker
            className="input"
            locale={"lt"}
            selected={this.state.date_from}
            onChange={this.handleFromChange}
          />
        </div>
        <div className="searchbar-item to">
          <label htmlFor="to">Laikas iki:</label>
          <DatePicker
            className="input"
            locale={"lt"}
            selected={this.state.date_until}
            onChange={this.handleUntilChange}
          />
        </div>
        <button onClick={this.handleSubmit} className="searchbar-submit">
          Ieškoti
        </button>
      </form>
    );
  }
}

export default Searchbar;
