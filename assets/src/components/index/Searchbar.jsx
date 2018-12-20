import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./searchbar.css";
import lt from "date-fns/locale/lt";
import moment from "moment";
import { inject, observer } from "mobx-react";
import $ from "jquery";
import history from "../../history";
import dateWithoutTime from "../../extras/dateFormatter";
registerLocale("lt", lt);
@inject("CarStore")
@observer
class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateNow: new Date(this.dateWithoutTimeLocal(new Date())),
      date_from: new Date(),
      date_until: moment(this.date_from)
        .add(7, "d")
        .toDate(),
      location: ""
    };
  }

  componentDidMount() {
    this.props.CarStore.getCities();
  }

  handleFromChange = date => {
    this.setState(
      {
        date_from: this.dateWithoutTimeLocal(date)
      },
      this.validateDateFrom
    );
  };

  handleUntilChange = date => {
    this.setState(
      {
        date_until: this.dateWithoutTimeLocal(date)
      },
      this.validateDateUntil
    );
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
      date_from: dateWithoutTime(date_from),
      date_until: dateWithoutTime(date_until)
    });
    getAllCars();
    history.push("/feed");
    $("body, html").animate({ scrollTop: $("#mainNav").offset().top }, 1000);
  };

  validateDateFrom = () => {
    if (this.state.date_from >= this.state.date_until) {
      this.setState({
        date_until: moment(this.state.date_from)
          .add(7, "d")
          .toDate()
      });
    }
  };

  dateWithoutTimeLocal = date => {
    const dateNew = new Date(date);
    return dateNew.setHours(0, 0, 0, 0);
  };

  validateDateUntil = () => {
    if (this.state.date_from >= this.state.date_until) {
      if (this.state.date_until > this.state.dateNow) {
        this.setState({
          date_from: moment(this.state.date_until)
            .subtract(1, "d")
            .toDate()
        });
      } else {
        this.validateDateFrom();
      }
    }
  };

  handleDateChangeRaw = e => {
    e.preventDefault();
  };

  render() {
    const { cities } = this.props.CarStore;

    return (
      <form className="searchbar">
        <div className="searchbar-item location">
          <label htmlFor=" location">Miestas:</label>
          <div className="relative">
            <select onChange={this.hadleCityChange}>
              <option value="">Visi</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>
                  {city.city}
                </option>
              ))}
            </select>
            <i className="fa fa-caret-down d-md-none" aria-hidden="true" />
          </div>
        </div>
        <div className="searchbar-item from">
          <label htmlFor="from">Laikas nuo:</label>
          <div className="relative">
            <DatePicker
              autocomplete="off"
              className="input"
              locale={"lt"}
              minDate={this.state.dateNow}
              selected={this.state.date_from}
              onChange={this.handleFromChange}
              startDate={this.state.date_from}
              endDate={this.state.date_until}
              selectsStart
              onChangeRaw={this.handleDateChangeRaw}
            />
            <i className="fa fa-caret-down d-md-none" aria-hidden="true" />
          </div>
        </div>
        <div className="searchbar-item to">
          <label htmlFor="to">Laikas iki:</label>
          <div className="relative">
            <DatePicker
              autocomplete="off"
              className="input"
              locale={"lt"}
              selected={this.state.date_until}
              onChange={this.handleUntilChange}
              minDate={moment(this.state.dateNow)
                .add(1, "d")
                .toDate()}
              startDate={this.state.date_from}
              endDate={this.state.date_until}
              selectsEnd
              onChangeRaw={this.handleDateChangeRaw}
            />
            <i className="fa fa-caret-down d-md-none" aria-hidden="true" />
          </div>
        </div>
        <button
          onClick={this.handleSubmit}
          className="submit-button gradient submit-button--searchbar"
        >
          Ieškoti
        </button>
      </form>
    );
  }
}

export default Searchbar;
