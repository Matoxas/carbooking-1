import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./searchbar.css";
import lt from "date-fns/locale/lt";
import moment from "moment";
import { inject, observer } from "mobx-react";
import $ from "jquery";
import history from "../../history";
registerLocale("lt", lt);
@inject("CarStore")
@observer
class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({
      date_from: date
    });
    this.checkDateLogic();
  };

  handleUntilChange = date => {
    this.setState({
      date_until: date
    });

    this.checkDateLogic();
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
    history.push("/feed");
    $("body, html").animate({ scrollTop: $("#mainNav").offset().top }, 1000);
  };

  checkDateLogic = () => {
    console.log("hello");

    if (this.state.date_until <= this.state.date_from) {
      this.setState({
        date_until: moment(this.state.date_from)
          .add(7, "d")
          .toDate()
      });
    }
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
            <i className="fa fa-caret-down" aria-hidden="true" />
          </div>
        </div>
        <div className="searchbar-item from">
          <label htmlFor="from">Laikas nuo:</label>
          <div className="relative">
            <DatePicker
              className="input"
              locale={"lt"}
              selected={this.state.date_from}
              onChange={this.handleFromChange}
            />
            <i className="fa fa-caret-down" aria-hidden="true" />
          </div>
        </div>
        <div className="searchbar-item to">
          <label htmlFor="to">Laikas iki:</label>
          <div className="relative">
            <DatePicker
              className="input"
              locale={"lt"}
              selected={this.state.date_until}
              onChange={this.handleUntilChange}
            />
            <i className="fa fa-caret-down" aria-hidden="true" />
          </div>
        </div>
        <button onClick={this.handleSubmit} className="searchbar-submit">
          Ieškoti
        </button>
      </form>
    );
  }
}

export default Searchbar;
