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
import $ from "jquery";
import PlacesAutocomplete from "react-places-autocomplete";

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
      date_from: moment(new Date()).toDate(),
      date_until: moment(this.date_from)
        .add(1, "d")
        .toDate(),
      images: [],

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
      }
    };
  }

  componentDidMount() {
    const { getAllCities, allCities } = this.props.CarStore;
    if (allCities.length <= 0) {
      getAllCities();
    }
    //scroll to top when component loads
    // $("body, html").animate({ scrollTop: $(".masthead").offset().top }, 1000);
  }

  formSubmit = () => {
    const { allCities } = this.props.CarStore;

    //validuojam įvestas reikšmes
    Validators.brand(this.state.brand, this.updateErrors);
    Validators.model(this.state.model, this.updateErrors);
    Validators.price(this.state.price, this.updateErrors);
    Validators.email(this.state.email, this.updateErrors);
    Validators.name(this.state.name, this.updateErrors);
    Validators.description(this.state.description, this.updateErrors);
    Validators.phone(this.state.phone, this.updateErrors);
    Validators.images(this.state.images, this.updateErrors);
    Validators.date(
      this.state.date_from,
      this.state.date_until,
      this.updateErrors
    );

    //tikrinam asinchronišką validaciją
    const callBack = Validators.address(
      this.state.address,
      this.updateErrors,
      this.setCity,
      allCities
    );

    // jei gavom promise, o ne false...
    if (callBack) {
      callBack.then(result => {
        if (result == true) {
          //tikrinam ar visos errorų žinutės tuščios
          result = Object.values(this.state.errors).every(error => error == "");
          //jei taip, siunčiam duomenis į BE
          if (result) {
            this.sendFormToRoute();
          }
        }
      });
    }
  };

  sendFormToRoute = () => {
    const fd = new FormData();
    //pridedam visus duomenis
    fd.append("brand", this.state.brand);
    fd.append("model", this.state.model);
    fd.append("city", this.state.city);
    fd.append("address", this.state.address);
    fd.append("price", this.state.price);
    fd.append("description", this.state.description);
    fd.append("phone", this.state.phone);
    fd.append("email", this.state.email);
    fd.append("name", this.state.name);
    fd.append("date_from", this.state.date_from);
    fd.append("date_until", this.state.date_until);

    //pridedam visus paveikslėlius
    this.state.images.forEach(image => {
      fd.append("image[]", image.file, image.file.name);
    });

    axios
      .post("http://localhost/api/new/car", fd)
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
      images
    });
  };

  setCity = city => {
    this.setState({
      city: city
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
    this.updateErrors({ date_until: "", date_from: "" });
    this.setState({
      date_from: date
    });
    this.validateDates();
  };

  handleUntilChange = date => {
    this.updateErrors({ date_until: "", date_from: "" });
    this.setState({
      date_until: date
    });
    this.validateDates();
  };

  handleChangeAddress = address => {
    this.setState({ address });
    this.updateErrors({ address: "" });
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

    const searchOptions = {
      // types: ["address"],
      strictbounds: true,
      componentRestrictions: { country: "ltu" }
    };

    if (load.brands || load.cities) {
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
                  Adresas:
                </label>
                <div className="col-sm-9 col-md-10">
                  <div className="relative">
                    <PlacesAutocomplete
                      value={this.state.address}
                      onChange={this.handleChangeAddress}
                      onSelect={this.handleChangeAddress}
                      searchOptions={searchOptions}
                      clearItemsOnError={true}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading
                      }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "įveskite automobilio lokaciją",
                              className: "form-control"
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Kraunasi...</div>}
                            {suggestions.map(suggestion => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer"
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer"
                                  };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
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
                  Vardas:
                </label>
                <div className="col-sm-9 col-md-10">
                  <div className="relative">
                    <input
                      name="name"
                      onChange={this.setValues}
                      type="text"
                      className="form-control"
                      placeholder="įveskite savo vardą"
                    />
                  </div>
                  {this.state.errors.name.length > 0 && (
                    <span className="invalid-feedback">
                      {this.state.errors.name}
                    </span>
                  )}
                </div>
              </div>
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
              type="button"
              onClick={this.formSubmit}
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
