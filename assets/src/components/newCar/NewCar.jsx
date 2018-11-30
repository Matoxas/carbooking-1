import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";
import "./newCar.css";
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
    this.validateBrand();
    this.validateModel();
    this.validatePrice();
    this.validateAddress();
    this.validateCity();
    this.validateDate();
    this.validateEmail();
    this.validateDescription();
    this.validatePhone();
    this.validateImages();
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

  setBrand = e => {
    const { getModels } = this.props.CarStore;
    getModels(e.target.value);
    this.setState({
      brand: e.target.value,
      model: "",
      errors: {
        ...this.state.errors,
        brand: ""
      }
    });
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
          .add(2, "d")
          .toDate()
      });
    }
  };

  validateBrand = () => {
    if (this.state.brand.length <= 0) {
      this.updateErrors({ brand: "pasirinkite gamintoją!" });
      return false;
    }
    return true;
  };

  validateModel = () => {
    if (this.state.model.length <= 0) {
      this.updateErrors({ model: "pasirinkite modelį!" });
      return false;
    }
    return true;
  };

  validateDescription = () => {
    if (this.state.description.length <= 10) {
      this.updateErrors({
        description: "aprašymas negali būti trumpesnis nei 10 simbolių!"
      });
    }
    return true;
  };

  validateCity = () => {
    if (this.state.city.length <= 0) {
      this.updateErrors({ city: "pasirinkite miestą!" });
      return false;
    }
    return true;
  };

  validateAddress = () => {
    if (this.state.address.length <= 0) {
      this.updateErrors({ address: "pasirinkite adresą!" });
      return false;
    }
    return true;
  };

  validateEmail = () => {
    if (this.state.email.length <= 0) {
      this.updateErrors({ email: "įveskite el.paštą!" });
      return false;
    }

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(this.state.email)) {
      this.updateErrors({ email: "įveskite teisingą el.paštą!" });
      return false;
    }

    return true;
  };

  validateDate = () => {
    if (this.state.date_from >= this.state.date_until) {
      this.updateErrors({
        date_from: "nuomos pradžia negali prasidėti veliau nei baigtis!",
        date_until: "nuomos pabaiga negali būti ankščiau nei pradžia!"
      });
      return false;
    }
    return true;
  };

  validatePrice = () => {
    if (this.state.price.length <= 0) {
      this.updateErrors({ price: "įveskite kainą!" });
      return false;
    }

    if (this.state.price <= 0) {
      this.updateErrors({ price: "kaina negali būti mažesnė nei 1€" });
      return false;
    }

    if (this.state.price > 99) {
      this.updateErrors({ price: "kainos limitas - 99€" });
      return false;
    }

    const pattern = new RegExp(/^([0-9]{0,2}((.)[0-9]{0,2}))$/i);
    if (!pattern.test(this.state.price)) {
      this.updateErrors({ price: "neteisingas kainos formatas!" });
      return false;
    }

    // if (!this.state.price.isDigit()) {
    //   this.setState({
    //     errors: {
    //       ...this.state.errors,
    //       price: "kainą įveskite iš skaičių"
    //     }
    //   });
    //   return false;
    // }

    return true;
  };

  validatePhone = () => {
    if (this.state.phone.length <= 0) {
      this.updateErrors({ phone: "įveskite telefono numerį!" });
      return false;
    }
    return true;
  };

  validateImages = () => {
    if (this.state.images.length <= 0) {
      this.updateErrors({ images: "pasirinkite bent vieną nuotrauką!" });
      return false;
    }
    return true;
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
                  <span className="invalid-feedback">
                    {this.state.errors.brand}
                  </span>
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
                  <span className="invalid-feedback">
                    {this.state.errors.model}
                  </span>
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
                  <span className="invalid-feedback">
                    {this.state.errors.description}
                  </span>
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
                  <span className="invalid-feedback">
                    {this.state.errors.city}
                  </span>
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
                  <span className="invalid-feedback">
                    {this.state.errors.address}
                  </span>
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
                  <span className="invalid-feedback">
                    {this.state.errors.date_from}
                  </span>
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
                  <span className="invalid-feedback">
                    {this.state.errors.date_until}
                  </span>
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
                  <span className="invalid-feedback">
                    {this.state.errors.price}
                  </span>
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
                  <span className="invalid-feedback">
                    {this.state.errors.phone}
                  </span>
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
                  <span className="invalid-feedback">
                    {this.state.errors.email}
                  </span>
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
          </div>
        </div>
      </div>
    );
  }
}

export default NewCar;
