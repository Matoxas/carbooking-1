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
      startDate: new Date(),
      endDate: moment(this.startDate)
        .add(7, "d")
        .toDate(),
      location: ""
    };
  }

  componentDidMount() {
    this.props.CarStore.getCities();
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  hadleCityChange = e => {
    this.setState({
      location: e.target.value
    });
  };

  handleSubmit = e => {
    const { CarStore } = this.props;
    e.preventDefault();
    CarStore.setCity(this.state.location);
    CarStore.setDate({
      from: this.state.startDate,
      until: this.state.endDate
    });
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
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>
        <div className="searchbar-item to">
          <label htmlFor="to">Laikas iki:</label>
          <DatePicker
            className="input"
            locale={"lt"}
            selected={this.state.endDate}
            onChange={this.handleChange}
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
