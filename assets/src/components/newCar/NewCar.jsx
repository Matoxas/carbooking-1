import React, { Component } from "react";
import moment from "moment";
import Loading from "../loading";
import Validators from "./formValidators";
import "./newCar.css";
import NewCarForm from "./newCarForm";
import axios from "axios";
import { inject, observer } from "mobx-react";

@inject("CarStore")
@inject("CarFormStore")
@observer
class NewCar extends Component {
  componentDidMount() {
    const { getAllCities, allCities } = this.props.CarStore;

    //scroll to top when component loads
    window.scrollTo(0, 0);

    //load available cities if not loaded yet
    if (allCities.length <= 0) {
      getAllCities();
    }
  }

  formSubmit = () => {
    const { allCities } = this.props.CarStore;
    const { currentCar } = this.props.CarFormStore;

    //validuojam įvestas reikšmes
    Validators.brand(currentCar.brand, this.updateErrors);
    Validators.model(currentCar.model, this.updateErrors);
    Validators.price(currentCar.price, this.updateErrors);
    Validators.email(currentCar.email, this.updateErrors);
    Validators.name(currentCar.name, this.updateErrors);
    Validators.description(currentCar.description, this.updateErrors);
    Validators.phone(currentCar.phone, this.updateErrors);
    Validators.images(currentCar.images, this.updateErrors);
    Validators.date(
      currentCar.date_from,
      currentCar.date_until,
      this.updateErrors
    );

    //tikrinam asinchronišką validaciją
    const callBack = Validators.address(
      currentCar.address,
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
    const { errors } = this.props.CarFormStore;
    return Object.values(errors).every(error => error == "");
  };

  hasSpecificError = input => {
    const { errors } = this.props.CarFormStore;
    return errors[input].length > 0;
  };

  sendFormToRoute = () => {
    const { currentCar } = this.props.CarFormStore;
    const fd = new FormData();
    //pridedam visus duomenis
    fd.append("brand", currentCar.brand);
    fd.append("model", currentCar.model);
    fd.append("city", currentCar.city);
    fd.append("address", currentCar.address);
    fd.append("price", currentCar.price);
    fd.append("description", currentCar.description);
    fd.append("phone", currentCar.phone);
    fd.append("email", currentCar.email);
    fd.append("name", currentCar.name);
    fd.append("date_from", currentCar.date_from.toJSON().replace("T", " "));
    fd.append("date_until", currentCar.date_until.toJSON().replace("T", " "));

    //pridedam visus paveikslėlius
    currentCar.images.forEach(image => {
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
    const {
      setCurrentCarValues,
      setCurrentCarErrors
    } = this.props.CarFormStore;

    //set value
    setCurrentCarValues({ [e.target.name]: e.target.value });
    //clear error
    setCurrentCarErrors({ [e.target.name]: "" });
  };

  setCity = city => {
    const { setCurrentCarValues } = this.props.CarFormStore;
    //set value
    setCurrentCarValues({ city });
  };

  setBrand = e => {
    const { getModels } = this.props.CarStore;
    const {
      setCurrentCarValues,
      setCurrentCarErrors
    } = this.props.CarFormStore;
    getModels(e.target.value);
    setCurrentCarValues({
      brand: e.target.value,
      model: ""
    });
    setCurrentCarErrors({ brand: "" });
  };

  clearForm = () => {
    const { setCurrentCarValues } = this.props.CarFormStore;
    setCurrentCarValues({
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

  onDeleteImage = id => {
    const {
      setCurrentCarValues,
      setCurrentCarErrors,
      currentCar
    } = this.props.CarFormStore;
    setCurrentCarErrors({ images: "" });
    const images = currentCar.images;
    const index = images.findIndex(image => image.id == id);
    images.splice(index, 1);
    setCurrentCarValues({ images });
  };

  setImages = images => {
    const { setCurrentCarValues } = this.props.CarFormStore;
    setCurrentCarValues({ images });
  };

  handleFromChange = date => {
    const {
      setCurrentCarValues,
      setCurrentCarErrors
    } = this.props.CarFormStore;
    setCurrentCarErrors({ date_until: "", date_from: "" });
    setCurrentCarValues({ date_from: date });
    this.validateDates();
  };

  handleUntilChange = date => {
    const {
      setCurrentCarValues,
      setCurrentCarErrors
    } = this.props.CarFormStore;
    setCurrentCarErrors({ date_until: "", date_from: "" });
    setCurrentCarValues({ date_until: date });
    this.validateDates();
  };

  handleChangeAddress = address => {
    const {
      setCurrentCarValues,
      setCurrentCarErrors
    } = this.props.CarFormStore;
    setCurrentCarErrors({ address: "" });
    setCurrentCarValues({ address });
  };

  validateDates = () => {
    const { setCurrentCarValues, currentCar } = this.props.CarFormStore;
    if (currentCar.date_from >= currentCar.date_until) {
      setCurrentCarValues({
        date_until: moment(currentCar.date_from)
          .add(1, "d")
          .toDate()
      });
    }
  };

  setImagesErrorMessage = message => {
    const { setCurrentCarErrors } = this.props.CarFormStore;
    setCurrentCarErrors({ images: message });
  };

  updateErrors = errors => {
    const { errors: prevErrors, setCurrentCarErrors } = this.props.CarFormStore;
    setCurrentCarErrors({
      ...prevErrors,
      ...errors
    });
  };

  render() {
    const { brands, models } = this.props.CarStore;
    const load = this.props.CarStore.loading;
    const { errors, currentCar } = this.props.CarFormStore;

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
              address={currentCar.address}
              date_from={currentCar.date_from}
              date_until={currentCar.date_until}
              errors={errors}
              brands={brands}
              models={models}
              images={currentCar.images}
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
