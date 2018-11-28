import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";
import "./NewCar.css";
import moment from "moment";
import ImageUpload from "./imageUpload";
registerLocale("lt", lt);
@inject("CarStore")
@observer
class NewCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_from: new Date(),
      date_until: moment(this.date_from)
        .add(1, "d")
        .toDate(),
      images: []
    };
  }

  componentWillMount() {
    this.props.CarStore.toggleHeader(false);
  }

  componentWillUnmount() {
    this.props.CarStore.toggleHeader(true);
  }

  handleFromChange = date => {
    this.setState({
      date_from: date
    });
  };

  handleUntilChange = date => {
    this.setState({
      date_until: date
    });
  };

  render() {
    return (
      <div className="main-wrapper">
        <div className="container">
          <div className="main newCarWrapper">
            <h2>Siūlyk savo automobilį</h2>
            <h5>pradėk įkeldamas keletą nuotraukų</h5>
            <div className="card">
              <ImageUpload />
            </div>

            <h5>automobilio informacija</h5>
            <div className="card">
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Gamintojas:
                </label>
                <div class="col-sm-9 col-md-10">
                  <div className="relative">
                    <select className="form-control" id="inputState">
                      <option value="" disabled selected>
                        Pasirink automobilio gamintoją
                      </option>
                    </select>
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Modelis:
                </label>
                <div class="col-sm-9 col-md-10">
                  <div className="relative">
                    <select className="form-control" id="inputState">
                      <option value="" disabled selected>
                        Pasirink automobilio modelį
                      </option>
                    </select>
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Aprašymas:
                </label>
                <div class="col-sm-9 col-md-10">
                  <div className="relative">
                    <textarea
                      className="form-control"
                      id="inputState"
                      placeholder="Trumpai aprašyk automobilį"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h5>vietos informacija</h5>
            <div className="card">
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Miestas:
                </label>
                <div class="col-sm-9 col-md-10">
                  <div className="relative">
                    <select className="form-control" id="inputState">
                      <option value="" disabled selected>
                        Pasirink automobilio miestą
                      </option>
                    </select>
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Adresas:
                </label>
                <div class="col-sm-9 col-md-10">
                  <div className="relative">
                    <select className="form-control" id="inputState">
                      <option value="" disabled selected>
                        Pasirink vietos adresą
                      </option>
                    </select>
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <h5>laikas ir kaina</h5>
            <div className="card">
              <div className="form-group row">
                <label className="col-sm-2" htmlFor="inputState">
                  Nuomos pradžia:
                </label>
                <div class="col-sm-4">
                  <div className="relative pb-mobile">
                    <DatePicker
                      className="form-control"
                      locale={"lt"}
                      minDate={new Date()}
                      maxDate={moment(this.date_from)
                        .add(31, "d")
                        .toDate()}
                      selected={this.state.date_from}
                      onChange={this.handleFromChange}
                    />
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                </div>
                <label
                  className="col-sm-2 border-left pt-mobile"
                  htmlFor="inputState"
                >
                  Nuomos pabaiga:
                </label>
                <div class="col-sm-4">
                  <div className="relative">
                    <DatePicker
                      className="form-control"
                      locale={"lt"}
                      minDate={moment(this.date_from)
                        .add(1, "d")
                        .toDate()}
                      maxDate={moment(this.date_from)
                        .add(31, "d")
                        .toDate()}
                      selected={this.state.date_until}
                      onChange={this.handleUntilChange}
                    />
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Paros kaina:
                </label>
                <div class="col-sm-9 col-md-10">
                  <div className="relative">
                    <input
                      className="form-control "
                      type="text"
                      placeholder="0.00 €"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h5>kontaktinė informacija</h5>
            <div className="card">
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Telefonas:
                </label>
                <div class="col-sm-9 col-md-10">
                  <div className="relative">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+370"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  El.paštas:
                </label>
                <div class="col-sm-9 col-md-10">
                  <div className="relative">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="pavyzdys@mail.lt"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-info">
              Paskelbti kataloge
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewCar;
