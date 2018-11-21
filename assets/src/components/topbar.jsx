import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { mapProps } from "recompose";
@inject("CarStore")
@observer
class Topbar extends Component {
  handleSortChange = e => {
    let sort = e.target.value.toLowerCase().split(" ");
    sort = sort[0];

    this.changeSort(sort);
  };

  changeSort(argument) {
    const { setSort } = this.props.CarStore;
    setSort(argument);
  }

  changeCity = e => {
    const { setFilters, getAllCars } = this.props.CarStore;
    setFilters({
      location: e.target.value
    });
    getAllCars();
  };

  render() {
    const { cities } = this.props.CarStore;

    const location = this.props.CarStore.filters.location;

    return (
      <div className="topbar margin-bottom min-height">
        <div className="topbar-content">
          <div className="form-group">
            <label htmlFor="inputState">Miestas:</label>
            <div className="relative">
              <select
                onChange={this.changeCity}
                className="form-control"
                id="inputState"
              >
                <option value="">Visi</option>
                {cities.map(city => {
                  if (city.id == location) {
                    return (
                      <option selected key={city.id} value={city.id}>
                        {city.city}
                      </option>
                    );
                  } else
                    return (
                      <option key={city.id} value={city.id}>
                        {city.city}
                      </option>
                    );
                })}
              </select>
              <i className="fa fa-caret-down" aria-hidden="true" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputState">Rodoma:</label>
            <div className="relative">
              <select
                onChange={this.handleSortChange}
                className="form-control"
                id="inputState"
              >
                <option defaultValue>Naujausi viršuje</option>
                <option>Seniausi viršuje</option>
                <option>Pigiausi viršuje</option>
                <option>Brangiausi viršuje</option>
              </select>
              <i className="fa fa-caret-down" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;

{
  /* <i class="fa fa-caret-down" aria-hidden="true"></i> */
}
