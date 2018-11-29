import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";
import "./NewCar.css";
import moment from "moment";
import ImageUpload from "./imageUpload";
import Loading from "../loading";
registerLocale("lt", lt);
@inject("CarStore")
@observer
class NewCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "",
      model: "",
      city: "",
      address: "",
      price: "",
      description: "",
      phone: "",
      email: "",
      name: "",

      date_from: new Date(),
      date_until: moment(this.date_from)
        .add(1, "d")
        .toDate(),
      images: []
    };
  }

  componentDidMount() {}

  componentWillMount() {
    this.props.CarStore.toggleHeader(false);
  }

  componentWillUnmount() {
    this.props.CarStore.toggleHeader(true);
  }

  setBrand = e => {
    console.log(e.target.value);
    const { getModels } = this.props.CarStore;
    getModels(e.target.value);
    this.setValues({
      brand: e.target.value
    });
  };

  setModel = e => {
    this.setValues({
      model: e.target.value,
      brand: ""
    });
  };

  setDescription = e => {
    this.setValues({
      description: e.target.value
    });
  };

  setPrice = e => {
    this.setValues({
      price: e.target.value
    });
  };

  setValues = values => {
    this.setState(values);
  };

  // componentWillUnmount() {
  //   // Make sure to revoke the data uris to avoid memory leaks
  //   const { images } = this.state;
  //   for (let i = images.length; i >= 0; i--) {
  //     const image = images[i];
  //     URL.revokeObjectURL(image.preview);
  //   }
  // }

  // setImages = data => {
  //   this.setState({ data });
  // };

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
    const { brands, models } = this.props.CarStore;
    const load = this.props.CarStore.loading;

    if (load.brands) {
      return (
        <div className="main">
          <div className="container">
            <div className="flex flex-center flex-column fullHeight">
              <Loading className={"loading"} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="main-wrapper">
        <div className="container">
          <div className="main newCarWrapper">
            <h2>Siūlyk savo automobilį</h2>
            <h5>pradėk įkeldamas keletą nuotraukų</h5>
            <div className="card">
              <ImageUpload
                images={this.state.images}
                setImages={this.setImages}
              />
            </div>

            <h5>automobilio informacija</h5>
            <div className="card">
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Gamintojas:
                </label>
                <div className="col-sm-9 col-md-10">
                  <div className="relative">
                    <select
                      onChange={this.setBrand}
                      className="form-control"
                      id="inputState"
                    >
                      <option value="" disabled selected>
                        Pasirink automobilio gamintoją
                      </option>

                      {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>
                          {brand.brand}
                        </option>
                      ))}
                    </select>
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Modelis:
                </label>
                <div className="col-sm-9 col-md-10">
                  <div className="relative">
                    <select
                      onChange={this.setModel}
                      className="form-control"
                      id="inputState"
                    >
                      <option value="" disabled selected>
                        Pasirink automobilio modelį
                      </option>
                      {models.map(model => (
                        <option key={model.id} value={model.id}>
                          {model.model}
                        </option>
                      ))}
                    </select>
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Aprašymas:
                </label>
                <div className="col-sm-9 col-md-10">
                  <div className="relative">
                    <textarea
                      onChange={this.setDescription}
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
                <div className="col-sm-9 col-md-10">
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
                <div className="col-sm-9 col-md-10">
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
                <div className="col-sm-4">
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
                <div className="col-sm-4">
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
                <div className="col-sm-9 col-md-10">
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="99"
                      onChange={this.setPrice}
                      className="form-control"
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
                <div className="col-sm-9 col-md-10">
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
                <div className="col-sm-9 col-md-10">
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
            <button
              onClick={() => {
                console.log(this.state);
              }}
              type="button"
              className="btn btn-info"
            >
              Paskelbti kataloge
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewCar;
