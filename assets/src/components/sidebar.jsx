import React, { Component } from "react";
import ReactBootstrapSlider from "react-bootstrap-slider";
import { inject, observer } from "mobx-react";
import loading from "./loading";

@inject("CarStore")
@observer
class Sidebar extends Component {
  value = [1, 99];

  changeValue = () => {
    // console.log(this.value);
  };

  setBrand = e => {
    const { CarStore } = this.props;
    CarStore.setModels(e.target.value);
  };

  render() {
    const { brands, models } = this.props.CarStore;
    return (
      <div className="sidebar min-height margin-bottom">
        <div className="sidebar-content">
          {" "}
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Gamintojas:</label>
            <select
              onChange={this.setBrand}
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option value="0">Rodyti visus</option>
              {brands.map(brand => {
                return (
                  <option key={brand.id} value={brand.id}>
                    {brand.brand}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">Modelis:</label>
            <select
              multiple
              className="form-control"
              id="exampleFormControlSelect2"
            >
              {models.map(model => {
                return (
                  <option key={model.id} value={model.id}>
                    {model.model}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ReactBootstrapSlider">Kaina:</label>
            <ReactBootstrapSlider
              value={this.value}
              change={this.changeValue()}
              slideStop={this.changeValue}
              step={5}
              max={99}
              min={1}
              orientation="horizontal"
              reversed={false}
            />
            <span>{this.value[0]}</span>
            <span className="float-right">{this.value[1]}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
