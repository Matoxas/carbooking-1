import React, { Component } from "react";
import ReactBootstrapSlider from "react-bootstrap-slider";

class Sidebar extends Component {
  value = [1, 99];

  changeValue = () => {
    console.log(this.value);
  };

  render() {
    return (
      <div className="sidebar min-height margin-bottom">
        <div className="sidebar-content">
          {" "}
          <div className="form-group">
            <label for="exampleFormControlSelect1">Gamintojas:</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>Audi</option>
              <option>BMW</option>
              <option>Mazda</option>
              <option>Toyota</option>
              <option>Subaru</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleFormControlSelect2">Modelis:</label>
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
            <div className="clearfix" />
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
