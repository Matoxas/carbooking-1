import React, { Component } from "react";
import moment from "moment";
import Loading from "../loading";
import Validators from "./formValidators";
import "./newCar.css";
import NewCarForm from "./newCarForm";
import axios from "axios";
import { inject, observer } from "mobx-react";

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
    window.scrollTo(0, 0);
  }

  clearForm = () => {
    this.setState({
      images: [],
      brand: "",
      model: "",
      city: "",
      address: "",
      price: "",
      description: "",
      phone: "",
      email: "",
      name: ""
    });
  };

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

    const submitResult = Promise.resolve(callBack)
      .then(result => {
        if (result == true) {
          //tikrinam ar visos errorų žinutės tuščios
          result = this.doesFormHasErrors();
          //jei taip, siunčiam duomenis į BE
          if (result) {
            result = this.sendFormToRoute();
            return result;
          } else {
            //jei ne, grąžinam false
            return false;
          }
        }
      })
      .catch(error => {
        return error;
      });

    return submitResult;
  };

  doesFormHasErrors = () => {
    return Object.values(this.state.errors).every(error => error == "");
  };

  hasSpecificError = input => {
    return this.state.errors[input].length > 0;
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
    fd.append("date_from", this.state.date_from.toJSON().replace("T", " "));
    fd.append("date_until", this.state.date_until.toJSON().replace("T", " "));

    //pridedam visus paveikslėlius
    this.state.images.forEach(image => {
      fd.append("image[]", image.file, image.file.name);
    });

    return axios
      .post("new/car", fd)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
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

  onDeleteImage = id => {
    this.setImagesErrorMessage("");
    this.setState(prevState => {
      const images = prevState.images;
      const index = images.findIndex(image => image.id == id);
      images.splice(index, 1);
      return { images };
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
            <NewCarForm
              doesFormHasErrors={this.doesFormHasErrors}
              hasSpecificError={this.hasSpecificError}
              clearForm={this.clearForm}
              address={this.state.address}
              date_from={this.state.date_from}
              date_until={this.state.date_until}
              errors={this.state.errors}
              brands={brands}
              models={models}
              images={this.state.images}
              handleChangeAddress={this.handleChangeAddress}
              handleFromChange={this.handleFromChange}
              handleUntilChange={this.handleUntilChange}
              onDelete={this.onDeleteImage}
              setBrand={this.setBrand}
              setImages={this.setImages}
              setImagesErrorMessage={this.setImagesErrorMessage}
              setValues={this.setValues}
              formSubmit={this.formSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NewCar;
