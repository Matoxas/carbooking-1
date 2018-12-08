import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./topbar.css";
import TopbarFilters from "./topbarFilters";
import TopbarSorts from "./topbarSorts";

@inject("CarStore")
@observer
class Topbar extends Component {
  constructor(props) {
    super(props);
    const { price_from, price_until } = props.CarStore.filters;
    this.state = {
      price: [price_from, price_until],
      windowWidth: window.innerWidth
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    const windowWidth = window.innerWidth;

    // sets the to current windowWidth
    this.setState({ windowWidth });
  };

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

  setValues = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { cities, brands, models } = this.props.CarStore;
    const { location, brand, model, sort } = this.props.CarStore.filters;
    const { windowWidth } = this.state;

    return (
      <div className="topbar margin-bottom min-height">
        <div className="topbar-content">
          {windowWidth > "991.98" ? (
            <div className="filters-wrapper">
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
          ) : (
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
          )}

          {windowWidth > "991.98" ? (
            <div className="filters-wrapper">
              <TopbarSorts
                sort_filter={sort}
                handleSortChange={this.handleSortChange}
              />
            </div>
          ) : (
            <TopbarSorts
              sort_filter={sort}
              handleSortChange={this.handleSortChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Topbar;
