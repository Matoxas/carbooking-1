import React, { Component } from "react";
import ReactBootstrapSlider from "react-bootstrap-slider";
import { inject, observer } from "mobx-react";

@inject("CarStore")
@observer
class Sidebar extends Component {
  value = [1, 99];

  changeValue = () => {
    // console.log(this.value);
  };

  render() {
    const { brands } = this.props.CarStore;
    return (
      <div className="sidebar min-height margin-bottom">
        <div className="sidebar-content">
          {" "}
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Gamintojas:</label>
            <select
              multiple
              className="form-control"
              id="exampleFormControlSelect1"
            >
              {brands.map(brand => {
                return (
                  <option key={brand.id} value={brand.brand}>
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
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
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
