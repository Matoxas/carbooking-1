import React, { Component } from "react";
import "./searchbar.css";
class Searchbar extends Component {
  state = {};
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
          <input type="text" placeholder="2018/12/21" />
        </div>
        <div className="searchbar-item to">
          <label htmlFor="to">Laikas iki:</label>
          <input type="text" placeholder="2018/12/25" />
        </div>
        <button className="searchbar-submit">Ieškoti</button>
      </form>
    );
  }
}

export default Searchbar;
