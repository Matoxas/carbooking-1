import { observable, action, computed, autorun } from "mobx";
import axios from "axios";
import moment from "moment";

class CarFormStore {
  // GLOBAL PARAMETERS

  @observable
  currentCar = {
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
    images: []
  };

  @observable
  errors = {
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
  };

  // ==================== GETTERS ====================

  // ==================== SETTERS ====================

  @action
  setCurrentCarValues = values => {
    this.currentCar = {
      ...this.currentCar,
      ...values
    };
  };

  @action
  setCurrentCarErrors = values => {
    this.errors = {
      ...this.errors,
      ...values
    };
  };
}

const store = new CarFormStore();
export default store;
