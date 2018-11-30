import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { ReactBootstrapSlider } from "react-bootstrap-slider";
import "./topbar.css";

@inject("CarStore")
@observer
class Topbar extends Component {
  constructor(props) {
    super(props);
    const { price_from, price_until } = props.CarStore.filters;
    this.state = {
      price: [price_from, price_until]
    };
  }

  handleSortChange = e => {
    let sort = e.target.value.toLowerCase().split(" ");
    sort = sort[0];

    this.changeSort(sort);
  };

  changeSort(argument) {
    this.setFilters({
      sort: argument
    });
    this.getCarsByFilters();
  }

  changeCity = e => {
    this.setFilters({
      location: e.target.value
    });
    this.getCarsByFilters();
  };

  changePrice = e => {
    this.setState({
      price: e.target.value
    });
  };

  changeBrand = e => {
    const { getModels } = this.props.CarStore;
    getModels(e.target.value);
    this.setFilters({
      brand: e.target.value,
      model: ""
    });
    this.getCarsByFilters();
  };

  changeModel = e => {
    this.setFilters({
      model: e.target.value
    });
    this.getCarsByFilters();
  };

  savePrice = () => {
    this.setFilters({
      price_from: this.state.price[0],
      price_until: this.state.price[1]
    });
    this.getCarsByFilters();
  };

  // Interactions with store

  setFilters = filters => {
    const { setFilters: saveFilters } = this.props.CarStore;
    saveFilters(filters);
  };

  getCarsByFilters = () => {
    const { getAllCars } = this.props.CarStore;
    getAllCars();
  };

  render() {
    const { cities, brands, models } = this.props.CarStore;
    const {
      location,
      brand: brand_filter,
      model: model_filter,
      sort: sort_filter
    } = this.props.CarStore.filters;

    return (
      <div className="topbar margin-bottom min-height">
        <div className="topbar-content">
          {/* <div className="filters"> */}
          <div className="form-group">
            <label className="d-md-none" htmlFor="inputState">
              Miestas:
            </label>
            <div className="relative">
              <select
                onChange={this.changeCity}
                className="form-control"
                id="inputState"
              >
                <option value="-1">Visi miestai</option>
                {cities.map(city => {
                  if (city.id == location) {
                    return (
                      <option selected key={city.id} value={city.id}>
                        {city.city}
                      </option>
                    );
                  }
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

          <div className="form-group gamintojai">
            <label className="d-md-none" htmlFor="inputState">
              Gamintojas:
            </label>
            <div className="relative">
              <select
                onChange={this.changeBrand}
                className="form-control"
                id="inputState"
              >
                <option value="-1">Visi gamintojai</option>
                {brands.map(brand => {
                  if (brand.id == brand_filter) {
                    return (
                      <option selected key={brand.id} value={brand.id}>
                        {brand.brand}
                      </option>
                    );
                  }
                  return (
                    <option key={brand.id} value={brand.id}>
                      {brand.brand}
                    </option>
                  );
                })}
              </select>
              <i className="fa fa-caret-down" aria-hidden="true" />
            </div>
          </div>

          <div className="form-group modeliai">
            <label className="d-md-none" htmlFor="inputState">
              Modelis:
            </label>
            <div className="relative">
              <select
                onChange={this.changeModel}
                className="form-control"
                id="inputState"
              >
                <option value="-1">Visi modeliai</option>

                {models.map(model => {
                  if (model.id == model_filter) {
                    return (
                      <option selected key={model.id} value={model.id}>
                        {model.model}
                      </option>
                    );
                  }
                  return (
                    <option key={model.id} value={model.id}>
                      {model.model}
                    </option>
                  );
                })}
              </select>
              <i className="fa fa-caret-down" aria-hidden="true" />
            </div>
          </div>

          <div className="form-group">
            <div className="slider">
              <label className="d-md-none" htmlFor="ReactBootstrapSlider">
                Kaina:
              </label>
              <ReactBootstrapSlider
                value={this.state.price}
                change={this.changePrice}
                slideStop={this.savePrice}
                step={1}
                max={99}
                min={1}
                orientation="horizontal"
                reversed={false}
              />
              <span className="left">{"€" + this.state.price[0]}</span>
              <span className="right">{"€" + this.state.price[1]}</span>
            </div>
          </div>
          {/* </div> */}
          {/* <div className="sort"> */}
          <div className="form-group">
            <label className="d-md-none" htmlFor="inputState">
              Rodoma:
            </label>
            <div className="relative">
              <select
                onChange={this.handleSortChange}
                className="form-control"
                id="inputState"
              >
                {sort_filter == "naujausi" ? (
                  <option selected>Naujausi viršuje</option>
                ) : (
                  <option>Naujausi viršuje</option>
                )}
                {sort_filter == "seniausi" ? (
                  <option selected>Seniausi viršuje</option>
                ) : (
                  <option>Seniausi viršuje</option>
                )}
                {sort_filter == "pigiausi" ? (
                  <option selected>Pigiausi viršuje</option>
                ) : (
                  <option>Pigiausi viršuje</option>
                )}
                {sort_filter == "brangiausi" ? (
                  <option selected>Brangiausi viršuje</option>
                ) : (
                  <option>Brangiausi viršuje</option>
                )}
              </select>
              <i className="fa fa-caret-down" aria-hidden="true" />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default Topbar;

{
  /* <i class="fa fa-caret-down" aria-hidden="true"></i> */
}
