import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";
import "./newCar.css";
import moment from "moment";
import ImageUpload from "./imageUpload";
import Loading from "../loading";
import Validators from "./formValidators";
import axios from "axios";

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

      errors: {
        brand: "",
        model: "",
        city: "",
        address: "",
        price: "",
        description: "",
        phone: "",
        email: "",
        name: "",
        images: "",
        date_from: "",
        date_until: ""
      },

      date_from: moment(new Date()).toDate(),
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

  formSubmit = () => {
    Validators.brand(this.state.brand, this.updateErrors);
    Validators.model(this.state.model, this.updateErrors);
    Validators.price(this.state.price, this.updateErrors);
    Validators.address(this.state.address, this.updateErrors);
    Validators.city(this.state.city, this.updateErrors);
    Validators.email(this.state.email, this.updateErrors);
    Validators.description(this.state.description, this.updateErrors);
    Validators.phone(this.state.phone, this.updateErrors);
    Validators.images(this.state.images, this.updateErrors);
    Validators.date(
      this.state.date_from,
      this.state.date_until,
      this.updateErrors
    );

    this.sendFormToRoute();

    //   const errors = this.state.errors;
    //   const HasErrors = errors.filter(error => error == "");

    //   if (HasErrors.length > 0) {
    //     alert("yra errorų");
    //   } else {
    //     alert("success");
    //   }
  };

  sendFormToRoute = () => {
    const fd = new FormData();
    fd.append("brand", this.state.brand);
    fd.append("brand", this.state.model);
    fd.append(
      "image",
      this.state.images[0].file,
      this.state.images[0].file.name
    );

    axios
      .post("http://localhost/api/newcar", fd)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error.response));
  };

  setValues = e => {
    const data = this.state;
    data[e.target.name] = e.target.value;
    this.setState({
      ...data,
      errors: {
        ...this.state.errors,
        [e.target.name]: ""
      }
    });
  };

  setImages = images => {
    this.setState({
      images: images
    });
  };

  onDeleteImage = id => {
    this.setImagesErrorMessage("");
    this.setState(prevState => {
      const images = prevState.images;
      const index = images.findIndex(image => image.id == id);
      images.splice(index, 1);
      return { images };
    });
  };

  setBrand = e => {
    const { getModels } = this.props.CarStore;
    getModels(e.target.value);
    this.setState({
      brand: e.target.value,
      model: "-1",
      errors: {
        ...this.state.errors,
        brand: ""
      }
    });
  };

  handleFromChange = date => {
    this.setState({
      date_from: date
    });
    this.validateDates();
  };

  handleUntilChange = date => {
    this.setState({
      date_until: date
    });
    this.validateDates();
  };

  validateDates = () => {
    if (this.state.date_from >= this.state.date_until) {
      this.setState({
        date_until: moment(this.state.date_from)
          .add(1, "d")
          .toDate()
      });
    }
  };

  setImagesErrorMessage = message => {
    this.updateErrors({ images: message });
  };

  updateErrors = errors => {
    this.setState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        ...errors
      }
    }));
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
                onDelete={this.onDeleteImage}
                setImagesErrorMessage={this.setImagesErrorMessage}
                images={this.state.images}
                setImages={this.setImages}
                errors={this.state.errors.images}
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
                      name="brand"
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

                  {this.state.errors.brand.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.brand}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Modelis:
                </label>
                <div className="col-sm-9 col-md-10">
                  <div className="relative">
                    <select
                      onChange={this.setValues}
                      name="model"
                      className="form-control"
                      id="inputState"
                    >
                      <option value="-1" disabled selected>
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
                  {this.state.errors.model.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.model}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  Aprašymas:
                </label>
                <div className="col-sm-9 col-md-10">
                  <div className="relative">
                    <textarea
                      onChange={this.setValues}
                      className="form-control"
                      name="description"
                      rows="1"
                      id="inputState"
                      placeholder="Trumpai aprašyk automobilį"
                    />
                  </div>
                  {this.state.errors.description.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.description}
                    </span>
                  )}
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
                    <select
                      name="city"
                      className="form-control"
                      id="inputState"
                    >
                      <option value="" disabled selected>
                        Pasirink automobilio miestą
                      </option>
                    </select>
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                  {this.state.errors.city.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.city}
                    </span>
                  )}
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
                  {this.state.errors.address.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.address}
                    </span>
                  )}
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
                      name="date_from"
                      minDate={new Date()}
                      maxDate={moment(new Date())
                        .add(31, "d")
                        .toDate()}
                      selected={this.state.date_from}
                      onChange={this.handleFromChange}
                    />
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                  {this.state.errors.date_from.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.date_from}
                    </span>
                  )}
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
                      name="date_until"
                      minDate={moment(this.state.date_from)
                        .add(1, "d")
                        .toDate()}
                      maxDate={moment(this.state.date_from)
                        .add(31, "d")
                        .toDate()}
                      selected={this.state.date_until}
                      onChange={this.handleUntilChange}
                    />
                    <i className="fa fa-caret-down" aria-hidden="true" />
                  </div>
                  {this.state.errors.date_until.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.date_until}
                    </span>
                  )}
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
                      name="price"
                      onChange={this.setValues}
                      className="form-control"
                      placeholder="0.00 €"
                    />
                  </div>
                  {this.state.errors.price.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.price}
                    </span>
                  )}
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
                      name="phone"
                      onChange={this.setValues}
                      type="text"
                      className="form-control"
                      placeholder="+370"
                    />
                  </div>
                  {this.state.errors.phone.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-md-2" htmlFor="inputState">
                  El.paštas:
                </label>
                <div className="col-sm-9 col-md-10">
                  <div className="relative">
                    <input
                      name="email"
                      onChange={this.setValues}
                      type="email"
                      className="form-control"
                      placeholder="pavyzdys@mail.lt"
                    />
                  </div>
                  {this.state.errors.email.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.email}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={this.formSubmit}
              type="button"
              className="btn btn-info"
            >
              Paskelbti kataloge
            </button>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    );
  }
}

export default NewCar;
