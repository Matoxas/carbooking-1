import React from "react";
import { ReactBootstrapSlider } from "react-bootstrap-slider";
import "./topbar.css";

const TopbarFilters = props => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label className="d-md-none" htmlFor="inputState">
          Miestas:
        </label>
        <div className="relative">
          <select
            onChange={props.changeCity}
            className="form-control"
            id="inputState"
            value={props.location}
          >
            <option value="">Visi miestai</option>
            {props.cities.map(city => {
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
            onChange={props.changeBrand}
            className="form-control"
            id="inputState"
            value={props.brand_filter}
          >
            <option value="">Visi gamintojai</option>
            {props.brands.map(brand => {
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
            onChange={props.changeModel}
            className="form-control"
            id="inputState"
            value={props.model_filter}
          >
            <option value="">Visi modeliai</option>

            {props.models.map(model => {
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
        <label className="d-md-none" htmlFor="ReactBootstrapSlider">
          Kaina:
        </label>
        <div className="slider">
          <ReactBootstrapSlider
            value={props.price}
            change={props.changePrice}
            slideStop={props.savePrice}
            step={1}
            max={99}
            min={1}
            orientation="horizontal"
            reversed={false}
          />
          <span className="left">{"€" + props.price[0]}</span>
          <span className="right">{"€" + props.price[1]}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TopbarFilters;
