import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./searchbar.css";
import lt from "date-fns/locale/lt";
import moment from "moment";

registerLocale("lt", lt);
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

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <form className="searchbar">
        <div className="searchbar-item location">
          <label htmlFor=" location">Vieta:</label>
          <select>
            <option value="1">Vilnius</option>
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
        <button className="searchbar-submit">Ieškoti</button>
      </form>
    );
  }
}

export default Searchbar;
