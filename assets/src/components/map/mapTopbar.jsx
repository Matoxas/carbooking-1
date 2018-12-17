import React, { Component } from "react";
import TopbarFilters from "../topbar/topbarFilters";
import { inject, observer } from "mobx-react";

@inject("CarStore")
@observer
class MapTopbar extends Component {
  constructor(props) {
    super(props);
    const { price_from, price_until } = props.CarStore.filters;
    this.state = {
      price: [price_from, price_until]
    };
  }

  componentDidMount() {
    // this.getCarsByFilters();
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
    const { getAllCars, total_pages } = this.props.CarStore;
    this.setFilters({
      page: "all"
    });
    getAllCars();
    this.setFilters({
      page: total_pages
    });
  };

  setValues = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { cities, brands, models } = this.props.CarStore;
    const { location, brand, model } = this.props.CarStore.filters;
    return (
      <div className="topbar margin-bottom min-height">
        <div className="topbar-content">
          <TopbarFilters
            brand_filter={brand}
            model_filter={model}
            location={location}
            {...this.state}
            cities={cities}
            brands={brands}
            models={models}
            changeCity={this.changeCity}
            changeBrand={this.changeBrand}
            changeModel={this.changeModel}
            changePrice={this.changePrice}
            savePrice={this.savePrice}
          />
        </div>
      </div>
    );
  }
}

export default MapTopbar;
